/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import React, { useEffect, useReducer, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import CampaignDetailPageTemplate from "../templates/CampaignDetailPageTemplate";
import { tokenReducer, tokenInitialState } from "../../reducers/token";
import { GET_CAMPAIGN } from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";
import { campaignReducer, campaignInitialState } from "../../reducers/campaign";
import {
  cancelCampaign,
  refundCampaign,
  getContractTokenBalance,
} from "../../utils/web3";
import { useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import { CampaignInfo, Recipients } from "../../interfaces";
import distributors from "../../utils/distributors";

const CampaignDetailPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
    distributorAddress: string;
    campaignAddress: string;
  }>
> = (props) => {
  const tokenAddress = props.match.params.tokenAddress;
  const campaignAddress = props.match.params.campaignAddress;
  const distributorAddress = props.match.params.distributorAddress;

  const { library } = useWeb3React();
  const [getCampaign, { data }] = useLazyQuery(GET_CAMPAIGN);

  const [tokenState] = useReducer(tokenReducer, tokenInitialState);

  const [campaignState, campaignDispatch] = useReducer(
    campaignReducer,
    campaignInitialState
  );

  const [targetNumber, setTargetNumber] = useState("0");
  const [distributorType, setDistributorType] = useState("");

  const getCampaignMetadata = async (campaign: CampaignInfo) => {
    const cid = campaign.campaignInfoCid;
    const url = `https://cloudflare-ipfs.com/ipfs/${cid}`;
    const response = await fetch(url);
    const campaignMetadata = await response.json();
    campaignDispatch({
      type: "campaignMetadata:set",
      payload: { data: campaignMetadata },
    });
  };

  const getTargets = useCallback(async (campaign) => {
    const cid = campaign.recipientsCid;
    const url = `https://cloudflare-ipfs.com/ipfs/${cid}`;
    const response = await fetch(url);
    const recipients: Recipients = await response.json();
    if (Object.keys(recipients).indexOf("targets") !== -1) {
      setTargetNumber(String(recipients.targets.length));
    }
    if (Object.keys(recipients).indexOf("addresses") !== -1) {
      //@ts-ignore
      setTartgetNumber(String(recipients.addresses.length));
    }
  }, []);

  const getDateString = (timestamp: number) => {
    const dateString = dayjs(Number(timestamp) * 1000).format("MM-DD-YYYY");
    return dateString;
  };

  const cancel = useCallback(async (library, campaignAddress) => {
    campaignDispatch({
      type: "campaign:cancel",
      payload: { data: false },
    });
    cancelCampaign(library, campaignAddress).then((transaction) => {
      if (transaction === undefined) {
        return;
      }
      transaction.wait().then((result) => {
        if (result.status === 1) {
          campaignDispatch({
            type: "status:update",
            payload: { data: 1 },
          });
        }
      });
    });
  }, []);

  const refund = useCallback(async (library, campaignAddress) => {
    campaignDispatch({
      type: "campaign:refund",
      payload: { data: false },
    });
    refundCampaign(library, campaignAddress).then((transaction) => {
      if (transaction === undefined) {
        return;
      }
      transaction.wait().then((result) => {
        if (result.status === 1) {
          campaignDispatch({
            type: "status:update",
            payload: { data: 2 },
          });
        }
      });
    });
  }, []);

  const getBalance = useCallback(
    async (library, tokenAddress, campaignAddress) => {
      const balance = await getContractTokenBalance(
        library,
        tokenAddress,
        campaignAddress
      );

      if (balance === undefined) {
        return;
      }
      campaignDispatch({
        type: "depositToken:set",
        payload: { data: String(balance) },
      });
    },
    []
  );

  useEffect(() => {
    const distributor = distributors.find(
      (distributor) => distributor.id === distributorAddress
    );
    setDistributorType(distributor?.type ?? "");
  }, [distributorAddress]);

  useEffect(() => {
    getCampaign({
      variables: {
        id: campaignAddress.toLowerCase(),
      },
    });
  }, [getCampaign, campaignAddress]);

  useEffect(() => {
    if (data === undefined || data === null || data.campaign == undefined) {
      return;
    }
    let canRefund = false;
    let canCancel = false;
    if (new Date().getTime() < data.campaign.startDate * 1000) {
      canCancel = true;
    }
    if (data.campaign.endDate * 1000 < new Date().getTime()) {
      canRefund = true;
    }

    campaignDispatch({
      type: "campaign:set",
      payload: { data: { campaign: data.campaign, canRefund, canCancel } },
    });

    getCampaignMetadata(data.campaign);
    getTargets(data.campaign);
  }, [data, getTargets]);

  useEffect(() => {
    if (library && campaignAddress !== "" && tokenAddress !== "") {
      getBalance(library, tokenAddress, campaignAddress);
    }
  }, [library, tokenAddress, campaignAddress, getBalance]);

  useEffect(() => {
    if (
      library &&
      campaignState.isCancelRequest === true &&
      campaignAddress !== ""
    ) {
      cancel(library, campaignAddress);
    }

    if (
      library &&
      campaignState.isRefundRequest === true &&
      campaignAddress !== ""
    ) {
      refund(library, campaignAddress);
    }
  }, [library, campaignState, campaignAddress, cancel, refund]);

  return (
    <>
      <CampaignDetailPageTemplate
        tokenInfo={tokenState}
        targetNumber={targetNumber}
        campaignData={campaignState}
        campaignDispatch={campaignDispatch}
        distributorType={distributorType}
      />
    </>
  );
};

export default CampaignDetailPage;
