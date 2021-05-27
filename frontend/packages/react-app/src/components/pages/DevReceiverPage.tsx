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
  useTokenBalance,
} from "@usedapp/core";
import { useTotalSupply } from "../../hooks/tokens/useTotalSupply";
import { useDecimals } from "../../hooks/tokens/useDecimals";
import { useMaxWithdrawableAmount } from "../../hooks/issuance/devReceiver/useMaxWithdrawableAmount";
import { useActualWithdrawableAmount } from "../../hooks/issuance/devReceiver/useActualWithdrawableAmount";
import {
  DevReceiver,
  DevReceiver__factory,
  ERC20,
  ERC20__factory,
} from "../../types";
import { ethers } from "ethers";
import { useMemo } from "react";

const devTokenAddress =
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

  const propertyTokenContract: ERC20 = useMemo(() => {
    // TODO remove zero address
    return new ERC20__factory().attach(
      data?.devReceiver?.propertyToken.id ?? ethers.constants.AddressZero
    );
  }, [data]);

  const { send: transfer, state: transferState } = useContractFunction(
    propertyTokenContract,
    "transfer"
  );
  const devReceiverContract: DevReceiver = new DevReceiver__factory().attach(
    devReceiverAddress
  );
  const { send: chargeReward, state: chargeRewardState } = useContractFunction(
    devReceiverContract,
    "chargeReward"
  );
  const { send: withdraw, state: withdrawState } = useContractFunction(
    devReceiverContract,
    "withdraw"
  );
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
  const actualWithdrawableAmount = useActualWithdrawableAmount(
    data?.devReceiver?.id,
    accountCTBalance
  );

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

  return (
    <DevReceiverPageTemplate
      account={account}
      actualWithdrawableAmount={actualWithdrawableAmount}
      chargeReward={chargeReward}
      communityToken={communityToken}
      ctBalance={accountCTBalance}
      ctTotalSupply={ctTotalSupply}
      contractDevBalance={contractDevBalance}
      contractPTBalance={contractPTBalance}
      devReceiver={data?.devReceiver}
      devReceiverAddress={devReceiverAddress}
      devTokenAddress={devTokenAddress}
      devToken={devToken}
      maxWithdrawableAmount={maxWithdrawableAmount}
      propertyToken={propertyToken}
      ptBalance={accountPTBalance}
      rescue={rescue}
      transfer={transfer}
      withdraw={withdraw}
    />
  );
};

export default DevReceiversPage;
