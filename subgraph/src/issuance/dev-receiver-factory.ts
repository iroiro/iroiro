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

import { DevReceiver, ERC20 } from "../types/schema";
import { CreateDevReceiver } from "../types/DevReceiverFactory/DevReceiverFactory";
import { ERC20 as ERC20Contract } from "../types/DevReceiverFactory/ERC20";
import { Address, log } from "@graphprotocol/graph-ts";

export function handleCreateDevReceiver(event: CreateDevReceiver): void {
  let devReceiverId = event.params.devReceiver.toHexString();
  let devReceiver = DevReceiver.load(devReceiverId);
  if (devReceiver == null) {
    devReceiver = new DevReceiver(devReceiverId);
  }
  devReceiver.author = event.params.creator.toHexString();
  let propertyTokenId = event.params.propertyToken;
  let communityTokenId = event.params.communityToken;
  devReceiver.propertyToken = propertyTokenId.toHexString();
  devReceiver.communityToken = communityTokenId.toHexString();

  createERC20(propertyTokenId);
  createERC20(communityTokenId);

  devReceiver.save();
}

function createERC20(tokenAddress: Address): void {
  let tokenContract = ERC20Contract.bind(tokenAddress);
  let token = ERC20.load(tokenAddress.toHexString());
  if (token == null) {
    token = new ERC20(tokenAddress.toHexString());
  }

  let tokenName = tokenContract.try_name();
  if (tokenName.reverted) {
    log.warning("Community Token Name not found. Community Token: {}", [
      tokenAddress.toHexString(),
    ]);
  } else {
    token.name = tokenName.value;
  }

  let tokenSymbol = tokenContract.try_symbol();
  if (tokenSymbol.reverted) {
    log.warning("Community Token Name not found. Community Token: {}", [
      tokenAddress.toHexString(),
    ]);
  } else {
    token.symbol = tokenSymbol.value;
  }

  token.save();
}
