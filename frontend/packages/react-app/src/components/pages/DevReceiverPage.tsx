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
import { Currency, useEthers, useTokenBalance } from "@usedapp/core";
import { useTotalSupply } from "../../hooks/tokens/useTotalSupply";
import { useDecimals } from "../../hooks/tokens/useDecimals";
import { useMaxWithdrawableAmount } from "../../hooks/issuance/devReceiver/useMaxWithdrawableAmount";
import { useActualWithdrawableAmount } from "../../hooks/issuance/devReceiver/useActualWithdrawableAmount";

const DevReceiversPage: React.FC<
  RouteComponentProps<{
    devReceiverAddress: string;
  }>
> = (props) => {
  const { account } = useEthers();
  const { data } = useGetDevReceiverQuery({
    variables: {
      id: props.match.params.devReceiverAddress.toLowerCase(),
    },
  });

  const accountPTBalance = useTokenBalance(
    data?.devReceiver?.propertyToken.id,
    account
  );
  const accountCTBalance = useTokenBalance(
    data?.devReceiver?.communityToken.id,
    account
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

  console.debug(
    account,
    data,
    accountPTBalance,
    contractPTBalance,
    ctTotalSupply,
    ctDecimals,
    maxWithdrawableAmount,
    actualWithdrawableAmount
  );

  return (
    <DevReceiverPageTemplate
      account={account}
      actualWithdrawableAmount={actualWithdrawableAmount}
      communityToken={communityToken}
      ctBalance={accountCTBalance}
      ctTotalSupply={ctTotalSupply}
      contractPTBalance={contractPTBalance}
      devReceiver={data?.devReceiver}
      devToken={devToken}
      maxWithdrawableAmount={maxWithdrawableAmount}
      propertyToken={propertyToken}
      ptBalance={accountPTBalance}
    />
  );
};

export default DevReceiversPage;
