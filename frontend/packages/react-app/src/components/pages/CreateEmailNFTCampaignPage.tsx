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

import * as React from "react";
import { useEffect, useReducer, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { createUUIDNFTCampaign } from "../../utils/web3";
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
  MERKLE_ROOT_EXECUTION_ARN,
  NFT_DISTRIBUTION_AMOUNT,
} from "../../utils/const";
import { emailInitialState, emailReducer } from "../../reducers/email";
import CreateEmailNFTCampaignPageTemplate from "../templates/CreateEmailNFTCampaignPageTemaplate";

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

interface CreateEmailNFTCampaignPageProps {
  readonly props: RouteComponentProps;
  readonly distributorAddress: string;
}

const CreateEmailNFTCampaignPage: React.FC<CreateEmailNFTCampaignPageProps> = ({
  props,
  distributorAddress,
}) => {
  const { library, active, account } = useWeb3React();
  const [distributorFormState, distributorFormDispatch] = useReducer(
    distributorFormReducer,
    {
      ...distributorFormInitialState,
      distributorType: "email-nft",
    }
  );
  const [emailState, emailDispatch] = useReducer(
    emailReducer,
    emailInitialState
  );
  const [merkletreeState, merkletreeDispatch] = useReducer(
    merkletreeReducer,
    merkltreeInitialState
  );
  const [recipientsCid, setRecipientsCid] = useState("");
  const [campaignInfoCid, setCampaignInfoCid] = useState("");
  const [nftImageCid, setNftImageCid] = useState("");
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

  useEffect(() => {
    emailDispatch({
      type: "distributorAddress:set",
      payload: {
        distributorAddress,
      },
    });
  }, [distributorAddress, emailDispatch]);

  const uploadToIpfs = useCallback(
    async (
      rawData,
      type: "campaignInfoCid" | "recipientsCid" | "nftImageCid"
    ) => {
      const data = type === "nftImageCid" ? rawData : JSON.stringify(rawData);
      const { path } = await ipfs.add(data);
      await postPinning({ data: { hashToPin: path } });
      if (type === "campaignInfoCid") {
        setCampaignInfoCid(path);
      }
      if (type === "recipientsCid") {
        setRecipientsCid(path);
      }
      if (type === "nftImageCid") {
        setNftImageCid(path);
      }
    },
    [postPinning]
  );

  const deployCampaign = useCallback(
    async (library, merkleRoot, campaignInfoCid, merkleTreeCid) => {
      distributorFormDispatch({
        type: "campaign:deploy",
        payload: { requestDeployCampaign: false },
      });
      distributorFormDispatch({
        type: "dialog:set",
        payload: { dialog: "creating-campaign" },
      });

      createUUIDNFTCampaign(library, merkleRoot, campaignInfoCid, merkleTreeCid)
        .then(async (transaction) => {
          if (transaction === undefined) {
            return;
          }
          await transaction.wait().then((result) => {
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
            const campaignId: string = campaignCreatedEvent.args?.treeId.toString();
            distributorFormDispatch({
              type: "createdCampaignId:set",
              payload: { campaignId },
            });
            distributorFormDispatch({
              type: "step:set",
              payload: { stepNo: 2 },
            });
          });
        })
        .catch((error) => {
          console.error(error);
          alert(
            "There was an error or you rejected transaction. Please try again later."
          );
        })
        .finally(() => {
          distributorFormDispatch({
            type: "dialog:set",
            payload: { dialog: "nothing" },
          });
        });
    },
    [props.history, distributorFormState.tokenAddress]
  );

  const makeMerkleProof = useCallback(
    async (allowance, recipientsCid, account) => {
      /*eslint-disable no-useless-escape*/
      const data = JSON.stringify({
        input: `{\"cid\": \"${recipientsCid}\",\"amount\": ${allowance.toString()}}`,
        name: `${account}-${Date.now()}`,
        stateMachineArn: MERKLE_ROOT_EXECUTION_ARN,
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
      alert(
        "There was an error or you rejected transaction. Please try again later."
      );
      distributorFormDispatch({
        type: "dialog:set",
        payload: { dialog: "nothing" },
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
    if (!emailState.moveToCampaignPage) {
      return;
    }
    props.history.push(
      `/dashboard/${distributorFormState.tokenAddress}/distributors/${distributorAddress}` +
        `/campaigns/${distributorFormState.createdCampaignId}`
    );
  }, [
    props.history,
    emailState.moveToCampaignPage,
    distributorFormState.createdCampaignId,
    distributorFormState.tokenAddress,
    distributorAddress,
  ]);

  useEffect(() => {
    const f = async () => {
      if (
        !distributorFormState.requestDeployCampaign ||
        distributorFormState.campaignImageFile === undefined
      ) {
        return;
      }
      await uploadToIpfs(distributorFormState.campaignImageFile, "nftImageCid");
    };
    f();
  }, [
    distributorFormState.requestDeployCampaign,
    distributorFormState.campaignImageFile,
  ]);

  useEffect(() => {
    const f = async () => {
      if (nftImageCid === "") {
        return;
      }
      if (distributorFormState.requestDeployCampaign) {
        const campaignInfo = {
          description: distributorFormState.campaignDescription,
          image: `ipfs://${nftImageCid}`,
          name: distributorFormState.campaignName,
        };

        const targets = {
          targets: emailState.targets,
          type: emailState.type,
        };

        await uploadToIpfs(campaignInfo, "campaignInfoCid");
        await uploadToIpfs(targets, "recipientsCid");
      }
    };
    f();
  }, [library, distributorFormState, nftImageCid]);

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
      !emailState.isValidQuantity
    ) {
      return;
    }

    makeMerkleProof(NFT_DISTRIBUTION_AMOUNT, recipientsCid, account);
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
          merkletreeState.merkleTreeCid
        );
        return;
      }
    };
    f();
  }, [merkletreeState]);

  return (
    <CreateEmailNFTCampaignPageTemplate
      active={active}
      distributorFormDispatch={distributorFormDispatch}
      distributorFormState={distributorFormState}
      emailState={emailState}
      emailDispatch={emailDispatch}
    />
  );
};

export default CreateEmailNFTCampaignPage;
