import React, { useEffect, useReducer, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import CampaignDetailPageTemaplate from "../templates/CampaignDetailPageTemaplate";
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
import moment from "moment";
import { CampaignInfo } from "../../interfaces";

const CampaignDetailPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
    distributorAddress: string;
    campaignAddress: string;
  }>
> = (props) => {
  const tokenAddress = props.match.params.tokenAddress;
  const campaignAddress = props.match.params.campaignAddress;

  const { library } = useWeb3React();
  const [getCampaign, { data }] = useLazyQuery(GET_CAMPAIGN);

  const [tokenState, tokenDispatch] = useReducer(
    tokenReducer,
    tokenInitialState
  );

  const [campaignState, campaignDispatch] = useReducer(
    campaignReducer,
    campaignInitialState
  );

  const [tartgetNumber, setTartgetNumber] = useState("0");

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
    const recipients = await response.json();
    setTartgetNumber(String(recipients.addresses.length));
  }, []);

  const getDateString = (timestamp: number) => {
    const dateString = moment(Number(timestamp)).local().format("MM-DD-YYYY");
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
    [campaignAddress]
  );

  useEffect(() => {
    getCampaign({
      variables: {
        id: campaignAddress.toLowerCase(),
      },
    });
  }, [campaignAddress]);

  useEffect(() => {
    if (data !== undefined) {
      let canRefund = false;
      if (data.campaign.endDate < new Date().getTime()) {
        canRefund = true;
      }

      const startDate = getDateString(data.campaign.startDate);
      const endDate = getDateString(data.campaign.endDate);
      data.campaign.startDate = startDate;
      data.campaign.endDate = endDate;

      campaignDispatch({
        type: "campaign:set",
        payload: { data: { campaign: data.campaign, canRefund: canRefund } },
      });

      getCampaignMetadata(data.campaign);
      getTargets(data.campaign);
    }
  }, [data]);

  useEffect(() => {
    if (library && campaignAddress !== "" && tokenAddress !== "") {
      getBalance(library, tokenAddress, campaignAddress);
    }
  }, [library, tokenAddress, campaignAddress]);

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
  }, [library, campaignState]);

  useEffect(() => {
    console.log(campaignState);
  }, [campaignState]);

  return (
    <>
      <CampaignDetailPageTemaplate
        tokenInfo={tokenState}
        targetNumber={tartgetNumber}
        campaignData={campaignState}
        campaignDispatch={campaignDispatch}
      />
    </>
  );
};

export default CampaignDetailPage;
