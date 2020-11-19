import { BigInt } from "@graphprotocol/graph-ts";
import { CreateToken } from "./types/TokenFactory/TokenFactory";
import { Transfer } from "./types/templates/FanToken/FanToken";
import { Account, AccountToken, Creator, Token } from "./types/schema";
import { FanToken } from "./types/templates";

export function handleCreateToken(event: CreateToken): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let token = Token.load(event.params.token.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (token == null) {
    token = new Token(event.params.token.toHex());
  }

  // Entity fields can be set based on event parameters
  token.creator = event.params.creator.toHex();
  token.name = event.params.name;
  token.symbol = event.params.symbol;
  token.totalSupply = event.params.totalSupply;
  token.decimals = event.params.decimals;
  token.creatorTokenRatio = event.params.creatorTokenRatio;
  token.isTotalSupplyFixed = event.params.isTotalSupplyFixed;
  token.lockupPeriod = event.params.lockupPeriod;
  token.enableStakeToToken = event.params.enableStakeToToken;
  token.accountTokens = [];

  // Entities can be written to the store with `.save()`
  token.save();

  let creator = Creator.load(event.params.creator.toHex());
  if (creator == null) {
    creator = new Creator(event.params.creator.toHex());
  }
  creator.save();

  FanToken.create(event.params.token);

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.createToken(...)
  // - contract.creatorTokenOf(...)
  // - contract.tokenAmountOf(...)
  // - contract.tokenOf(...)
  // - contract.totalTokenCount(...)
}

export function handleTransfer(event: Transfer): void {
  let tokenId = event.address.toHex();
  let token = Token.load(tokenId);
  let fromAccount = Account.load(event.params.from.toHex());
  if (fromAccount == null) {
    fromAccount = new Account(event.params.from.toHex());
  }
  fromAccount.save();

  let toAccount = Account.load(event.params.to.toHex());
  if (toAccount == null) {
    toAccount = new Account(event.params.to.toHex());
  }
  toAccount.save();

  let fromAccountTokenId = event.params.from
    .toHexString()
    .concat("-")
    .concat(tokenId);
  let fromAccountToken = AccountToken.load(fromAccountTokenId);
  if (fromAccountToken == null) {
    fromAccountToken = new AccountToken(fromAccountTokenId);
    fromAccountToken.balance = BigInt.fromI32(0);
  }
  fromAccountToken.account = fromAccount.id;
  fromAccountToken.balance = fromAccountToken.balance.minus(event.params.value);
  fromAccountToken.save();

  let toAccountTokenId = event.params.to
    .toHexString()
    .concat("-")
    .concat(tokenId);
  let toAccountToken = AccountToken.load(toAccountTokenId);
  if (toAccountToken == null) {
    toAccountToken = new AccountToken(toAccountTokenId);
    toAccountToken.balance = BigInt.fromI32(0);
  }
  toAccountToken.account = toAccount.id;
  toAccountToken.balance = toAccountToken.balance.plus(event.params.value);
  toAccountToken.save();

  let tmpAccountsTokens = token.accountTokens;
  if (!tmpAccountsTokens.includes(fromAccountTokenId)) {
    tmpAccountsTokens.push(fromAccountTokenId);
  }
  if (!tmpAccountsTokens.includes(toAccountTokenId)) {
    tmpAccountsTokens.push(toAccountTokenId);
  }
  token.accountTokens = tmpAccountsTokens;

  token.save();
}
