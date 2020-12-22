import React, { useEffect, useReducer, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import CreateCampaignPageTemaplate from "../templates/CreateCampaignPageTemaplate";
import {
  getWalletBalance,
  getAllowance,
  setApproveAmount,
  createCampaign,
} from "../../utils/web3";
import { tokenReducer, tokenInitialState } from "../../reducers/token";
import {
  distributorFormReducer,
  distributorFormInitialState,
} from "../../reducers/distributorForm";
import { audiusReducer, audiusInitialState } from "../../reducers/audius";

// @ts-ignore
import Audius from "@audius/libs";
import IpfsHttpClient from "ipfs-http-client";

declare global {
  interface Window {
    libs: any;
  }
}

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

const init = async () => {
  const dataRegistryAddress = "0xC611C82150b56E6e4Ec5973AcAbA8835Dd0d75A2";

  const ethTokenAddress = "0xADEf65C0f6a30Dcb5f88Eb8653BBFe09Bf99864f";
  const ethRegistryAddress = "0xb2be26Ca062c5D74964921B80DE6cfa28D9A36c0";
  const ethProviderUrl =
    "https://mainnet.infura.io/v3/d6b566d7eea1408988388c311d5a273a";
  const ethProviderOwnerWallet = "0xe886a1858d2d368ef8f02c65bdd470396a1ab188";

  const libs = new Audius({
    web3Config: Audius.configInternalWeb3(dataRegistryAddress, [
      "https://core.poa.network",
    ]),

    ethWeb3Config: Audius.configEthWeb3(
      ethTokenAddress,
      ethRegistryAddress,
      ethProviderUrl,
      ethProviderOwnerWallet
    ),

    discoveryProviderConfig: Audius.configDiscoveryProvider(),
    identityServiceConfig: Audius.configIdentityService(
      "https://identityservice.audius.co"
    ),
    creatorNodeConfig: Audius.configCreatorNode(
      "https://creatornode.audius.co"
    ),
  });
  await libs.init();
  window.libs = libs;
  return libs;
};

const CreateCampaignPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
    distributorAddress: string;
  }>
> = (props) => {
  const { library, active } = useWeb3React();
  const tokenAddress = props.match.params.tokenAddress;
  const distributorAddress = props.match.params.distributorAddress;

  const [tokenState, tokenDispatch] = useReducer(
    tokenReducer,
    tokenInitialState
  );

  const [distributorFormState, distributorFormDispatch] = useReducer(
    distributorFormReducer,
    distributorFormInitialState
  );

  const [audiusState, audiusDispatch] = useReducer(
    audiusReducer,
    audiusInitialState
  );

  const [libs, setLibs] = useState(Object);
  const [recipientsCid, setRecipientsCid] = useState("");
  const [campaignInfoCid, setCampaignInfoCid] = useState("");
  const [recipientsNum, setRecipientsNum] = useState(0);

  const audiusSignIn = useCallback(
    async (email, password) => {
      console.log(email);
      console.log(password);

      const { user } = await libs.Account.login(email, password);
      console.log(user);
      // const followers = await libs.User.getFollowersForUser(
      //   100,
      //   0,
      //   user.user_id
      // );
      // console.log(followers);
      // setAudiusAccount(user);
      // setAudiusFollowers(followers);
    },
    [libs]
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
    async (library, approveAmount) => {
      setApproveAmount(
        library,
        tokenAddress,
        distributorAddress,
        approveAmount
      ).then((transaction) => {
        if (transaction === undefined) {
          return;
        }
        transaction.wait().then((result) => {
          if (result.status === 1) {
            tokenDispatch({
              type: "token:setAllowance",
              payload: { allowance: approveAmount },
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

  const uploadJsonIpfs = useCallback(async (data, type) => {
    const { path } = await ipfs.add(JSON.stringify(data));
    if (type === "campaignInfoCid") {
      setCampaignInfoCid(path);
    }
    if (type === "recipientsCid") {
      setRecipientsCid(path);
    }
  }, []);

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
    if (distributorFormState.approveRequest && library) {
      approve(library, distributorFormState.approveAmount);
    }
    if (distributorFormState.requestDeployCampaign) {
      const campaignInfo = {
        description: "",
        image: "",
        name: distributorFormState.campaignName,
      };

      // TODO: Temporal Data
      const addresses = {
        addresses: [
          "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
          "0xc61641C59f5c459Da94E330535A95df4d5fACeAe",
          "0xAF9A4Ec7aDd58d7F184c5D13e40eBB2B41Ed9e0D",
        ],
      };
      uploadJsonIpfs(campaignInfo, "campaignInfoCid");
      uploadJsonIpfs(addresses, "recipientsCid");
      setRecipientsNum(addresses.addresses.length);
    }
  }, [
    library,
    distributorFormState,
    approve,
    uploadJsonIpfs,
    setRecipientsNum,
  ]);

  useEffect(() => {
    if (
      campaignInfoCid === "" ||
      recipientsCid === "" ||
      recipientsNum === 0 ||
      distributorFormState.startDate == null ||
      distributorFormState.endDate == null
    ) {
      return;
    }

    deployCampaign(
      library,
      campaignInfoCid,
      recipientsCid,
      recipientsNum,
      distributorFormState.startDate,
      distributorFormState.endDate
    );
  }, [
    library,
    campaignInfoCid,
    recipientsCid,
    recipientsNum,
    distributorFormState,
    deployCampaign,
  ]);

  useEffect(() => {
    const initLibs = async () => {
      const libs = await init();
      console.log(libs);
      setLibs(libs);
      // const user = libs.Account.getCurrentUser();

      // if (user) {
      //   const followers = await libs.User.getFollowersForUser(
      //     100,
      //     0,
      //     user.user_id
      //   );
      //   console.log(followers);
      //   //   setAudiusAccount(user);
      //   //   setAudiusFollowers(followers);
      // }
    };
    initLibs();
  }, []);

  useEffect(() => {
    if (audiusState.requestSignin === true) {
      audiusSignIn(audiusState.email, audiusState.password);
    }
  }, [audiusState, audiusSignIn]);

  return (
    <>
      <CreateCampaignPageTemaplate
        active={active}
        tokenInfo={tokenState}
        targets={[]}
        targetNumber={10000}
        distributorFormDispatch={distributorFormDispatch}
        distributorFormState={distributorFormState}
        audiusState={audiusState}
        audiusDispatch={audiusDispatch}
      />
    </>
  );
};

export default CreateCampaignPage;
