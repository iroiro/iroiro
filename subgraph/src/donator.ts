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
