import React, { useEffect, useReducer, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import CreateWalletCampaignPageTemaplate from "../templates/CreateWalletCampaignPageTemaplate";
import {
  getWalletBalance,
  getAllowance,
  setApproveAmount,
  createCampaign,
  parseUnits,
} from "../../utils/web3";
import { tokenReducer, tokenInitialState } from "../../reducers/token";
import {
  distributorFormReducer,
  distributorFormInitialState,
} from "../../reducers/distributorForm";

import IpfsHttpClient from "ipfs-http-client";
import useAxios from "axios-hooks";
import { IPFS_PINNING_API } from "../../utils/const";
import { Recipients } from "../../interfaces";

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

interface CreateWalletCampaignPageProps {
  readonly props: RouteComponentProps<{ tokenAddress: string }>;
  readonly distributorAddress: string;
}

const CreateWalletCampaignPage: React.FC<CreateWalletCampaignPageProps> = ({
  props,
  distributorAddress,
}) => {
  const { library, active } = useWeb3React();
  const tokenAddress = props.match.params.tokenAddress;

  const [tokenState, tokenDispatch] = useReducer(
    tokenReducer,
    tokenInitialState
  );
  const [distributorFormState, distributorFormDispatch] = useReducer(
    distributorFormReducer,
    distributorFormInitialState
  );

  const [recipientsCid, setRecipientsCid] = useState("");
  const [campaignInfoCid, setCampaignInfoCid] = useState("");
  const [{ error: pinningError }, postPinning] = useAxios(
    {
      url: IPFS_PINNING_API,
      method: "POST",
    },
    { manual: true }
  );

  const getBalance = useCallback(
    async (library) => {
      const balance = await getWalletBalance(library, tokenAddress);
      if (balance === undefined) {
        return;
      }
      tokenDispatch({
        type: "token:setBalance",
        payload: { tokenBalance: balance },
      });
    },
    [tokenAddress]
  );

  const getAllowanceAmount = useCallback(
    async (library) => {
      const allowance = await getAllowance(
        library,
        tokenAddress,
        distributorAddress
      );
      if (allowance === undefined) {
        return;
      }
      tokenDispatch({
        type: "token:setAllowance",
        payload: { allowance: allowance },
      });
    },
    [tokenAddress, distributorAddress]
  );

  const approve = useCallback(
    async (library, approveAmount, decimals) => {
      setApproveAmount(
        library,
        tokenAddress,
        distributorAddress,
        approveAmount,
        decimals
      ).then((transaction) => {
        if (transaction === undefined) {
          return;
        }
        transaction.wait().then((result) => {
          if (result.status === 1) {
            tokenDispatch({
              type: "token:setAllowance",
              payload: { allowance: parseUnits(approveAmount, decimals) },
            });
          }
        });
      });
      distributorFormDispatch({
        type: "approveAmount:set",
        payload: { approveAmount: "0" },
      });
    },
    [distributorAddress, tokenAddress]
  );

  const uploadJsonIpfs = useCallback(
    async (data, type) => {
      const { path } = await ipfs.add(JSON.stringify(data));
      await postPinning({ data: { hashToPin: path } });
      if (type === "campaignInfoCid") {
        setCampaignInfoCid(path);
      }
      if (type === "recipientsCid") {
        setRecipientsCid(path);
      }
    },
    [postPinning]
  );

  const deployCampaign = useCallback(
    async (
      library,
      campaignInfoCid,
      recipientsCid,
      recipientsNum,
      startDate,
      endDate
    ) => {
      const secondsStartDate = startDate / 1000;
      const secondsEndDate = endDate / 1000;

      createCampaign(
        library,
        tokenAddress,
        campaignInfoCid,
        recipientsCid,
        recipientsNum,
        secondsStartDate,
        secondsEndDate
      ).then((transaction) => {
        if (transaction === undefined) {
          return;
        }
        transaction.wait().then((result) => {
          if (result.status === 1) {
            if (result.events && result.events[4].args) {
              const campaignAddress = result.events[4].args.campaign;
              props.history.push(
                window.location.pathname + `/campaigns/${campaignAddress}`
              );
            }
          }
        });
      });
    },
    [props.history, tokenAddress]
  );

  useEffect(() => {
    if (library) {
      getBalance(library);
      getAllowanceAmount(library);
    }
  }, [library, tokenAddress, getBalance, getAllowanceAmount]);

  useEffect(() => {
    tokenDispatch({
      type: "token:getLocal",
      payload: { tokenAddress: tokenAddress },
    });
  }, [tokenAddress]);

  useEffect(() => {
    const f = async () => {
      if (distributorFormState.approveRequest && library) {
        approve(
          library,
          distributorFormState.approveAmount,
          tokenState.token?.decimals
        );
      }
      if (distributorFormState.requestDeployCampaign) {
        const campaignInfo = {
          description: "",
          image: "",
          name: distributorFormState.campaignName,
        };

        // const followersAddress: string[] = audiusState.followers.map(
        //   (follower) => follower.wallet
        // );
        // const addresses: Recipients = {
        //   targets: followersAddress,
        //   type: "address",
        // };
        await uploadJsonIpfs(campaignInfo, "campaignInfoCid");
        // await uploadJsonIpfs(addresses, "recipientsCid");
      }
    };
    f();
  }, [library, distributorFormState, approve, uploadJsonIpfs]);

  useEffect(() => {
    if (pinningError) {
      console.error(pinningError);
      alert(
        "There is an error on uploading a file used for campaign. Please try again later."
      );
      return;
    }
    if (
      campaignInfoCid === "" ||
      recipientsCid === "" ||
      // audiusState.followersCount === 0 ||
      distributorFormState.startDate == null ||
      distributorFormState.endDate == null
    ) {
      return;
    }

    // deployCampaign(
    //   library,
    //   campaignInfoCid,
    //   recipientsCid,
    //   // audiusState.followersCount,
    //   distributorFormState.startDate,
    //   distributorFormState.endDate
    // );
  }, [
    library,
    campaignInfoCid,
    recipientsCid,
    // audiusState,
    distributorFormState,
    deployCampaign,
    pinningError,
  ]);

  return (
    <>
      <CreateWalletCampaignPageTemaplate
        active={active}
        tokenInfo={tokenState}
        distributorFormDispatch={distributorFormDispatch}
        distributorFormState={distributorFormState}
      />
    </>
  );
};

export default CreateWalletCampaignPage;
