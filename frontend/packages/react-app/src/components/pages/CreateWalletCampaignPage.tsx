import React, { useEffect, useReducer, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import CreateWalletCampaignPageTemaplate from "../templates/CreateWalletCampaignPageTemaplate";
import {
  getWalletBalance,
  getAllowance,
  setApproveAmount,
  createWalletCampaign,
  parseUnits,
} from "../../utils/web3";
import { tokenReducer, tokenInitialState } from "../../reducers/token";
import {
  distributorFormReducer,
  distributorFormInitialState,
} from "../../reducers/distributorForm";
import { walletReducer, walletInitialState } from "../../reducers/wallet";
import { WalletListState } from "../../interfaces";

import IpfsHttpClient from "ipfs-http-client";
import useAxios from "axios-hooks";
import { IPFS_PINNING_API, MERKLE_ROOT_API } from "../../utils/const";
import { BigNumber } from "ethers";

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
  const [walletListState, walletListDispatch] = useReducer(
    walletReducer,
    walletInitialState
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
      url: MERKLE_ROOT_API,
      method: "POST",
    },
    { manual: true }
  );

  const [merkleRoot, setMerkleRoot] = useState("");

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
      // const { path } = await ipfs.add(JSON.stringify(data));
      // console.log(path);
      // await postPinning({ data: { hashToPin: path } });
      if (type === "campaignInfoCid") {
        // setCampaignInfoCid(path);
        // TODO:
        setCampaignInfoCid("Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA");
      }
      if (type === "recipientsCid") {
        // setRecipientsCid(path);
        // TODO:
        setRecipientsCid("QmVrBcK6WZvcKvnJXLq1RM8fVkyAdiDXJFvfXxCtQF73MX");
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

      createWalletCampaign(
        library,
        merkleRoot,
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

  const makeMerkleProof = useCallback(
    async (allowance, targetNum, recipientsCid, account) => {
      const BNAllowance = BigNumber.from(allowance);
      const BNTargetsNum = BigNumber.from(targetNum);
      // TODO
      const amount = BNAllowance.div(BNTargetsNum).toString();
      const data = JSON.stringify({
        input: {
          cid: recipientsCid,
          amount: amount,
        },
        name: `${account}-${Date.now()}`,
        stateMachineArn:
          "arn:aws:states:ap-northeast-1:179855544942:stateMachine:MerkleTreeStateMachine-LhKmb5ybYQV3",
      });
      // await postPinning({ data: { hashToPin: path } });
      console.log(data);
      const response = await postMakeProof({ data: data });
      // const response = await fetch(url, {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: data,
      // });
      console.log(response);
      // const result = await response.json();
      // console.log(result);
    },
    []
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

        const addresses = {
          targets: walletListState.targets,
          type: walletListState.type,
        };

        await uploadJsonIpfs(campaignInfo, "campaignInfoCid");
        await uploadJsonIpfs(addresses, "recipientsCid");
      }
    };
    f();
  }, [library, distributorFormState, approve, uploadJsonIpfs, walletListState]);

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
      walletListState.targets.length === 0 ||
      distributorFormState.startDate == null ||
      distributorFormState.endDate == null ||
      tokenState.allowance === ""
    ) {
      return;
    }

    // TODO: change merkleRoot value dynamically
    const merkleRoot =
      "0x6ff9dfec88bddca62d41745d6afedab6889fcebec5e3de5624e5bbbdb096150e";
    // if (merkleRoot === "") {
    //   makeMerkleProof(
    //     tokenState.allowance,
    //     walletListState.targets.length,
    //     recipientsCid,
    //     account
    //   );
    // } else {
    deployCampaign(
      library,
      merkleRoot,
      campaignInfoCid,
      recipientsCid,
      walletListState.targets.length,
      distributorFormState.startDate,
      distributorFormState.endDate
    );
    // }
  }, [distributorFormState]);

  useEffect(() => {
    if (walletListState.filelist === null) {
      return;
    }
    const file = walletListState.filelist[0];
    const reader = new FileReader();
    let walletList: WalletListState;
    reader.onloadend = () => {
      if (reader.result?.toString() === undefined) {
        return;
      }
      walletList = JSON.parse(reader.result?.toString());
      walletListDispatch({
        type: "walletlist:set",
        payload: { targets: walletList.targets },
      });
    };
    reader.readAsText(file);
  }, [walletListState]);

  return (
    <>
      <CreateWalletCampaignPageTemaplate
        active={active}
        tokenInfo={tokenState}
        distributorFormDispatch={distributorFormDispatch}
        distributorFormState={distributorFormState}
        walletDispatch={walletListDispatch}
        walletListState={walletListState}
      />
    </>
  );
};

export default CreateWalletCampaignPage;
