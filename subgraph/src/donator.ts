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

import { Donate as DonateEvent } from "./types/Donator/Donator";
import { Donate } from "./types/schema";

// TODO: Implementing Donator is in pending
export function handleDonate(event: DonateEvent): void {
  let fromAddress = event.params.from.toHexString();
  let timestamp = event.block.timestamp.toString();
  let donateId = fromAddress.concat("-").concat(timestamp);
  let donate = Donate.load(donateId);
  if (donate == null) {
    donate = new Donate(donateId);
  }

  donate.from = event.params.from.toHexString();
  donate.to = event.params.to.toHexString();
  donate.token = event.params.token.toHexString();
  donate.amount = event.params.amount;

  donate.save();
}
