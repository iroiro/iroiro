import React, { useEffect, useReducer, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import CreateUUIDCampaignPageTemplate from "../templates/CreateUUIDCampaignPageTemaplate";
import {
  getWalletBalance,
  getAllowance,
  setApproveAmount,
  createWalletCampaign,
  parseUnits,
  createUUIDCampaign,
} from "../../utils/web3";
import { tokenReducer, tokenInitialState } from "../../reducers/token";
import {
  distributorFormReducer,
  distributorFormInitialState,
} from "../../reducers/distributorForm";
import {
  merkletreeReducer,
  merkltreeInitialState,
} from "../../reducers/merkletree";

import IpfsHttpClient from "ipfs-http-client";
import useAxios from "axios-hooks";
import {
  IPFS_PINNING_API,
  MERKLE_ROOT_API_START,
  MERKLE_ROOT_API_DESCRIBE,
} from "../../utils/const";
import { BigNumber } from "ethers";
import { uuidInitialState, uuidReducer } from "../../reducers/uuid";

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

interface CreateUUIDCampaignPageProps {
  readonly props: RouteComponentProps<{ tokenAddress: string }>;
  readonly distributorAddress: string;
}

const CreateUUIDCampaignPage: React.FC<CreateUUIDCampaignPageProps> = ({
  props,
  distributorAddress,
}) => {
  const { library, active, account } = useWeb3React();
  const tokenAddress = props.match.params.tokenAddress;

  const [tokenState, tokenDispatch] = useReducer(
    tokenReducer,
    tokenInitialState
  );
  const [distributorFormState, distributorFormDispatch] = useReducer(
    distributorFormReducer,
    distributorFormInitialState
  );
  const [uuidState, uuidDispatch] = useReducer(uuidReducer, uuidInitialState);
  const [merkletreeState, merkletreeDispatch] = useReducer(
    merkletreeReducer,
    merkltreeInitialState
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

  const [{ error: proofError }, postMakeProof] = useAxios(
    {
      url: MERKLE_ROOT_API_START,
      method: "post",
    },
    { manual: true }
  );

  const [{ error: describeError }, describeMakeProof] = useAxios(
    {
      url: MERKLE_ROOT_API_DESCRIBE,
      method: "post",
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
      merkleRoot,
      campaignInfoCid,
      recipientsCid,
      merkleTreeCid,
      recipientsNum,
      startDate,
      endDate
    ) => {
      distributorFormDispatch({
        type: "campaign:deploy",
        payload: { requestDeployCampaign: false },
      });

      const secondsStartDate = startDate / 1000;
      const secondsEndDate = endDate / 1000;

      createUUIDCampaign(
        library,
        merkleRoot,
        tokenAddress,
        campaignInfoCid,
        recipientsCid,
        merkleTreeCid,
        recipientsNum,
        secondsStartDate,
        secondsEndDate
      ).then((transaction) => {
        if (transaction === undefined) {
          return;
        }
        transaction.wait().then((result) => {
          if (result.status !== 1) {
            return;
          }
          if (result.events == undefined) {
            return;
          }
          const campaignCreatedEvent = result.events.find(
            (event) =>
              event.event === "CreateCampaign" &&
              event.address.toLowerCase() === distributorAddress.toLowerCase()
          );
          if (campaignCreatedEvent === undefined) {
            return;
          }
          const campaignAddress: string = campaignCreatedEvent.args?.campaign;
          distributorFormDispatch({
            type: "createdCampaignAddress:set",
            payload: { address: campaignAddress.toLowerCase() },
          });
          distributorFormDispatch({
            type: "step:set",
            payload: { stepNo: 4 },
          });
        });
      });
    },
    [props.history, tokenAddress]
  );

  const makeMerkleProof = useCallback(
    async (allowance, targetNum, recipientsCid, account) => {
      const BNAllowance = BigNumber.from(allowance);
      const BNTargetsNum = BigNumber.from(targetNum);
      const amount = BNAllowance.div(BNTargetsNum).toString();

      /*eslint-disable no-useless-escape*/
      const data = JSON.stringify({
        input: `{\"cid\": \"${recipientsCid}\",\"amount\": ${amount}}`,
        name: `${account}-${Date.now()}`,
        stateMachineArn:
          "arn:aws:states:ap-northeast-1:179855544942:stateMachine:MerkleTreeStateMachine-LhKmb5ybYQV3",
      });
      const response = await postMakeProof({ data: data });
      merkletreeDispatch({
        type: "startExecution:result",
        payload: { executionArn: response.data.executionArn },
      });
    },
    []
  );

  const describeMerkleProof = useCallback(async (executionArn) => {
    const data = JSON.stringify({
      executionArn: executionArn,
    });
    const response = await describeMakeProof({ data: data });
    if (response.data.status === "RUNNING") {
      console.log("RUNNING");
      merkletreeDispatch({
        type: "describeStatus:update",
        payload: { status: response.data.status },
      });
    }
    if (response.data.status === "FAILED") {
      console.log("FAILED");
      merkletreeDispatch({
        type: "describeStatus:update",
        payload: { status: response.data.status },
      });
    }
    if (response.data.status === "SUCCEEDED") {
      console.log("SUCCEEDED");
      const data = JSON.parse(response.data.output);
      merkletreeDispatch({
        type: "merkleroot:set",
        payload: { merkleRoot: data.merkleRoot, merkleTreeCid: data.cid },
      });
    }
  }, []);

  useEffect(() => {
    if (!uuidState.moveToCampaignPage) {
      return;
    }
    props.history.push(
      window.location.pathname +
        `/campaigns/${distributorFormState.createdCampaignAddress}`
    );
  }, [
    props.history,
    uuidState.moveToCampaignPage,
    distributorFormState.createdCampaignAddress,
  ]);

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

        const targets = {
          targets: uuidState.targets,
          type: uuidState.type,
        };

        await uploadJsonIpfs(campaignInfo, "campaignInfoCid");
        await uploadJsonIpfs(targets, "recipientsCid");
      }
    };
    f();
  }, [library, distributorFormState]);

  useEffect(() => {
    if (!distributorFormState.requestDeployCampaign) {
      return;
    }

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
      !uuidState.isValidQuantity ||
      distributorFormState.startDate == null ||
      distributorFormState.endDate == null ||
      tokenState.allowance === ""
    ) {
      return;
    }

    makeMerkleProof(
      tokenState.allowance,
      uuidState.quantity,
      recipientsCid,
      account
    );
  }, [distributorFormState, campaignInfoCid, recipientsCid]);

  useEffect(() => {
    const f = async () => {
      const _sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      if (
        merkletreeState.executionArn === "" ||
        merkletreeState.status === "FAILED"
      ) {
        return;
      }
      if (
        merkletreeState.status === "" ||
        merkletreeState.status === "RUNNING"
      ) {
        await _sleep(5000);
        describeMerkleProof(merkletreeState.executionArn);
        return;
      }
      if (merkletreeState.status === "SUCCEEDED") {
        deployCampaign(
          library,
          merkletreeState.merkleRoot,
          campaignInfoCid,
          recipientsCid,
          merkletreeState.merkleTreeCid,
          uuidState.quantity,
          distributorFormState.startDate,
          distributorFormState.endDate
        );
        return;
      }
    };
    f();
  }, [merkletreeState]);

  return (
    <CreateUUIDCampaignPageTemplate
      active={active}
      tokenAddress={tokenAddress}
      tokenInfo={tokenState}
      distributorFormDispatch={distributorFormDispatch}
      distributorFormState={distributorFormState}
      uuidState={uuidState}
      uuidDispatch={uuidDispatch}
    />
  );
};

export default CreateUUIDCampaignPage;
