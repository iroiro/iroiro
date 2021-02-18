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
import { useWeb3React } from "@web3-react/core";
import CreateCampaignPageTemaplate from "../templates/CreateAudiusCampaignPageTemaplate";
import {
  getWalletBalance,
  getAllowance,
  setApproveAmount,
  createAudiusCampaign,
  parseUnits,
} from "../../utils/web3";
import { tokenReducer, tokenInitialState } from "../../reducers/token";
import {
  distributorFormReducer,
  distributorFormInitialState,
} from "../../reducers/distributorForm";
import { audiusReducer, audiusInitialState } from "../../reducers/audius";

import IpfsHttpClient from "ipfs-http-client";
import { useAudiusLibs } from "../../hooks/audius/useAudiusLibs";
import { useGetAudiusUserOrSignIn } from "../../hooks/audius/useGetAudiusUser";
import { useGetAudiusFollowers } from "../../hooks/audius/useGetAudiusFollowers";
import useAxios from "axios-hooks";
import { IPFS_PINNING_API } from "../../utils/const";
import { Recipients } from "../../interfaces";

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

interface CreateAudiusCampaignPageProps {
  readonly props: RouteComponentProps<{ tokenAddress: string }>;
  readonly distributorAddress: string;
}

const CreateAudiusCampaignPage: React.FC<CreateAudiusCampaignPageProps> = ({
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
  const [audiusState, audiusDispatch] = useReducer(
    audiusReducer,
    audiusInitialState
  );

  const { libs } = useAudiusLibs();
  const user = useGetAudiusUserOrSignIn(
    libs,
    audiusState.email,
    audiusState.password,
    audiusState.requestSignin
  );
  const { followersCount, followers, progress } = useGetAudiusFollowers(
    libs,
    user
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

  useEffect(() => {
    audiusDispatch({ type: "libs:set", payload: { libs } });
  }, [libs]);

  useEffect(() => {
    audiusDispatch({ type: "user:set", payload: { user } });
  }, [user]);

  useEffect(() => {
    audiusDispatch({ type: "followersCount:set", payload: { followersCount } });
    audiusDispatch({ type: "followers:set", payload: { followers } });
    audiusDispatch({ type: "progress:set", payload: { progress } });
  }, [followersCount, followers, progress]);

  const audiusSignOut = useCallback(async () => {
    await audiusState.libs.Account.logout();
    audiusDispatch({ type: "state:reset" });
  }, [audiusState.libs]);

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

      createAudiusCampaign(
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
                `/dashboard/${tokenAddress}/distributors/${distributorAddress}` +
                  `/campaigns/${campaignAddress}`
              );
            }
          }
        });
      });
    },
    [props.history, tokenAddress, distributorAddress]
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

        const followersAddress: string[] = audiusState.followers.map(
          (follower) => follower.wallet
        );
        const addresses: Recipients = {
          targets: followersAddress,
          type: "address",
        };
        await uploadJsonIpfs(campaignInfo, "campaignInfoCid");
        await uploadJsonIpfs(addresses, "recipientsCid");
      }
    };
    f();
  }, [library, distributorFormState, approve, uploadJsonIpfs, audiusState]);

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
      audiusState.followersCount === 0 ||
      distributorFormState.startDate == null ||
      distributorFormState.endDate == null
    ) {
      return;
    }

    deployCampaign(
      library,
      campaignInfoCid,
      recipientsCid,
      audiusState.followersCount,
      distributorFormState.startDate,
      distributorFormState.endDate
    );
  }, [
    library,
    campaignInfoCid,
    recipientsCid,
    audiusState,
    distributorFormState,
    deployCampaign,
    pinningError,
  ]);

  useEffect(() => {
    if (audiusState.isRequestSignout === true && audiusState.user) {
      audiusSignOut();
    }
  }, [audiusState.isRequestSignout, audiusState.user, audiusSignOut]);

  return (
    <>
      <CreateCampaignPageTemaplate
        active={active}
        tokenInfo={tokenState}
        distributorFormDispatch={distributorFormDispatch}
        distributorFormState={distributorFormState}
        audiusState={audiusState}
        audiusDispatch={audiusDispatch}
      />
    </>
  );
};

export default CreateAudiusCampaignPage;
