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
  getCampaignBalance,
} from "../../utils/web3";
import { useWeb3React } from "@web3-react/core";
import { CampaignInfo } from "../../interfaces";
import distributors from "../../utils/distributors";

const CampaignDetailPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
    distributorAddress: string;
    campaignId: string;
  }>
> = (props) => {
  const tokenAddress = props.match.params.tokenAddress;
  const campaignId = props.match.params.campaignId;
  const distributorAddress = props.match.params.distributorAddress;

  const { library } = useWeb3React();
  const [getCampaign, { data }] = useLazyQuery(GET_CAMPAIGN);

  const [tokenState] = useReducer(tokenReducer, tokenInitialState);

  const [campaignState, campaignDispatch] = useReducer(
    campaignReducer,
    campaignInitialState
  );

  const [distributor, setDistributor] = useState("");
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
    async (library, campaignId: string) => {
      const balance = await getCampaignBalance(
        library,
        distributor,
        campaignId
      );

      if (balance === undefined) {
        return;
      }
      campaignDispatch({
        type: "depositToken:set",
        payload: { data: String(balance) },
      });
    },
    [distributor]
  );

  useEffect(() => {
    const distributor = distributors.find(
      (distributor) => distributor.id === distributorAddress
    );
    setDistributor(distributor?.id ?? "");
    setDistributorType(distributor?.type ?? "");
  }, [distributorAddress]);

  useEffect(() => {
    getCampaign({
      variables: {
        id: campaignId,
      },
    });
  }, [getCampaign, campaignId]);

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
  }, [data]);

  useEffect(() => {
    if (library && campaignId !== "") {
      getBalance(library, campaignId);
    }
  }, [library, campaignId, getBalance]);

  useEffect(() => {
    if (
      library &&
      campaignState.isCancelRequest === true &&
      campaignId !== ""
    ) {
      cancel(library, campaignId);
    }

    if (
      library &&
      campaignState.isRefundRequest === true &&
      campaignId !== ""
    ) {
      refund(library, campaignId);
    }
  }, [library, campaignState, campaignId, cancel, refund]);

  return (
    <>
      <CampaignDetailPageTemplate
        tokenInfo={tokenState}
        campaignData={campaignState}
        distributorType={distributorType}
        tokenAddress={tokenAddress}
        distributorAddress={distributorAddress}
        campaignId={campaignId}
      />
    </>
  );
};

export default CampaignDetailPage;
