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
import { useGetDevReceiverQuery } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import DevReceiverPageTemplate from "../templates/DevReceiverPageTemplate";
import {
  Currency,
  useContractFunction,
  useEthers,
  useTokenAllowance,
  useTokenBalance,
} from "@usedapp/core";
import { useTotalSupply } from "../../hooks/tokens/useTotalSupply";
import { useDecimals } from "../../hooks/tokens/useDecimals";
import { useMaxWithdrawableAmount } from "../../hooks/issuance/devReceiver/useMaxWithdrawableAmount";
import { useActualWithdrawableAmount } from "../../hooks/issuance/devReceiver/useActualWithdrawableAmount";
import { DevReceiver__factory, ERC20, ERC20__factory } from "../../types";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
// @ts-ignore
import { abis } from "@project/contracts";
import { useChargeableReward } from "../../hooks/issuance/devReceiver/useChargeableReward";

export const devTokenAddress =
  process.env?.REACT_APP_DEV_TOKEN_ADDRESS ??
  "0x5caf454ba92e6f2c929df14667ee360ed9fd5b26";

const DevReceiversPage: React.FC<
  RouteComponentProps<{
    devReceiverAddress: string;
  }>
> = (props) => {
  const devReceiverAddress = props.match.params.devReceiverAddress.toLowerCase();
  const { account } = useEthers();
  const { data } = useGetDevReceiverQuery({
    variables: {
      id: props.match.params.devReceiverAddress.toLowerCase(),
    },
  });
  const [openChargeRewardModal, setOpenChargeRewardModal] = useState(false);
  const [openWithdrawRewardModal, setOpenWithdrawRewardModal] = useState(false);
  const [openDepositPTModal, setOpenDepositPTModal] = useState(false);
  const [openWithdrawPTModal, setOpenWithdrawPTModal] = useState(false);
  const [openWithdrawDEVModal, setOpenWithdrawDEVModal] = useState(false);
  const [amountToBurn, setAmountToBurn] = useState("0.0");
  const [amountToDeposit, setAmountToDeposit] = useState("0.0");

  const communityTokenContract: ERC20 = useMemo(() => {
    // TODO remove zero address
    return new ERC20__factory().attach(
      data?.devReceiver?.communityToken.id ?? ethers.constants.AddressZero
    );
  }, [data]);
  const { send: approveCT, state: approveCTState } = useContractFunction(
    communityTokenContract,
    "approve"
  );

  const propertyTokenContract: ERC20 = useMemo(() => {
    // TODO remove zero address
    return new ERC20__factory().attach(
      data?.devReceiver?.propertyToken.id ?? ethers.constants.AddressZero
    );
  }, [data]);

  const { send: transferPT, state: transferPTState } = useContractFunction(
    propertyTokenContract,
    "transfer"
  );
  const devReceiverContract = new DevReceiver__factory().attach(
    devReceiverAddress
  );
  const { send: chargeReward, state: chargeRewardState } = useContractFunction(
    devReceiverContract,
    "chargeReward"
  );
  const {
    send: withdrawReward,
    state: withdrawRewardState,
  } = useContractFunction(devReceiverContract, "withdraw");
  const { send: rescue, state: rescueState } = useContractFunction(
    devReceiverContract,
    "rescue"
  );

  const accountPTBalance = useTokenBalance(
    data?.devReceiver?.propertyToken.id,
    account
  );
  const accountCTBalance = useTokenBalance(
    data?.devReceiver?.communityToken.id,
    account
  );
  const contractDevBalance = useTokenBalance(
    devTokenAddress,
    data?.devReceiver?.id
  );
  const contractPTBalance = useTokenBalance(
    data?.devReceiver?.propertyToken.id,
    data?.devReceiver?.id
  );
  const ctTotalSupply = useTotalSupply(data?.devReceiver?.communityToken.id);
  const ctDecimals = useDecimals(data?.devReceiver?.communityToken.id);
  const maxWithdrawableAmount = useMaxWithdrawableAmount(
    data?.devReceiver?.id,
    accountCTBalance
  );
  const chargeableReward = useChargeableReward(data?.devReceiver?.id);

  const communityToken = new Currency(
    data?.devReceiver?.communityToken.name ?? "",
    data?.devReceiver?.communityToken.symbol ?? "",
    ctDecimals ?? 0
  );
  const propertyToken = new Currency(
    data?.devReceiver?.propertyToken.name ?? "",
    data?.devReceiver?.propertyToken.symbol ?? "",
    18
  );
  const devToken = new Currency("Dev", "DEV", 18);
  const ctAllowance = useTokenAllowance(
    communityTokenContract.address,
    account,
    devReceiverAddress
  );

  const actualMaxWithdrawableAmount = useActualWithdrawableAmount(
    data?.devReceiver?.id,
    accountCTBalance
  );

  return (
    <DevReceiverPageTemplate
      account={account}
      actualMaxWithdrawableAmount={actualMaxWithdrawableAmount}
      approveCT={approveCT}
      approveCTStatus={approveCTState}
      chargeReward={chargeReward}
      chargeRewardStatus={chargeRewardState}
      chargeableReward={chargeableReward}
      communityToken={communityToken}
      ctAllowance={ctAllowance}
      ctBalance={accountCTBalance}
      ctTotalSupply={ctTotalSupply}
      contractDevBalance={contractDevBalance}
      contractPTBalance={contractPTBalance}
      depositPT={transferPT}
      depositPTStatus={transferPTState}
      devReceiver={data?.devReceiver}
      devReceiverAddress={devReceiverAddress}
      devTokenAddress={devTokenAddress}
      devToken={devToken}
      maxWithdrawableAmount={maxWithdrawableAmount}
      propertyToken={propertyToken}
      propertyTokenAddress={propertyTokenContract.address}
      ptBalance={accountPTBalance}
      rescue={rescue}
      transfer={transferPT}
      withdraw={withdrawReward}
      withdrawReward={withdrawReward}
      withdrawRewardStatus={withdrawRewardState}
      withdrawPT={rescue}
      withdrawPTStatus={rescueState}
      withdrawDEV={rescue}
      withdrawDEVStatus={rescueState}
      amountToBurn={amountToBurn}
      setAmountToBurn={setAmountToBurn}
      amountToDeposit={amountToDeposit}
      setAmountToDeposit={setAmountToDeposit}
      openChargeRewardModal={openChargeRewardModal}
      setOpenChargeRewardModal={setOpenChargeRewardModal}
      openWithdrawRewardModal={openWithdrawRewardModal}
      setOpenWithdrawRewardModal={setOpenWithdrawRewardModal}
      openDepositPTModal={openDepositPTModal}
      setOpenDepositPTModal={setOpenDepositPTModal}
      openWithdrawPTModal={openWithdrawPTModal}
      setOpenWithdrawPTModal={setOpenWithdrawPTModal}
      openWithdrawDEVModal={openWithdrawDEVModal}
      setOpenWithdrawDEVModal={setOpenWithdrawDEVModal}
    />
  );
};

export default DevReceiversPage;
