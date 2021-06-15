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

import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { useContractCall } from "@usedapp/core";
import { BigNumber } from "ethers";
import { DevReceiver__factory } from "../../../types";

export function useActualWithdrawableAmount(
  devReceiverAddress: string | Falsy,
  amountToBurn: BigNumber | Falsy
): BigNumber | undefined {
  const [amount] =
    useContractCall(
      devReceiverAddress &&
        amountToBurn && {
          abi: new DevReceiver__factory().attach(devReceiverAddress).interface,
          address: devReceiverAddress,
          method: "actualWithdrawableAmount",
          args: [amountToBurn],
        }
    ) ?? [];

  return amount;
}
