/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface StringMerkleDistributorManagerInterface
  extends ethers.utils.Interface {
  functions: {
    "merkleRootMap(uint256)": FunctionFragment;
    "remainingAmountMap(uint256)": FunctionFragment;
    "tokenMap(uint256)": FunctionFragment;
    "isClaimed(uint256,uint256)": FunctionFragment;
    "claim(uint256,uint256,string,uint256,bytes32[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "merkleRootMap",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "remainingAmountMap",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenMap",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isClaimed",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [BigNumberish, BigNumberish, string, BigNumberish, BytesLike[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "merkleRootMap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "remainingAmountMap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenMap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isClaimed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;

  events: {
    "Claimed(uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claimed"): EventFragment;
}

export class StringMerkleDistributorManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: StringMerkleDistributorManagerInterface;

  functions: {
    merkleRootMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "merkleRootMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    remainingAmountMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "remainingAmountMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    "tokenMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isClaimed(
      campaignId: BigNumberish,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isClaimed(uint256,uint256)"(
      campaignId: BigNumberish,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    claim(
      campaignId: BigNumberish,
      index: BigNumberish,
      target: string,
      amount: BigNumberish,
      merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "claim(uint256,uint256,string,uint256,bytes32[])"(
      campaignId: BigNumberish,
      index: BigNumberish,
      target: string,
      amount: BigNumberish,
      merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  merkleRootMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "merkleRootMap(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  remainingAmountMap(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "remainingAmountMap(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "tokenMap(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  isClaimed(
    campaignId: BigNumberish,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isClaimed(uint256,uint256)"(
    campaignId: BigNumberish,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  claim(
    campaignId: BigNumberish,
    index: BigNumberish,
    target: string,
    amount: BigNumberish,
    merkleProof: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "claim(uint256,uint256,string,uint256,bytes32[])"(
    campaignId: BigNumberish,
    index: BigNumberish,
    target: string,
    amount: BigNumberish,
    merkleProof: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    merkleRootMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "merkleRootMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    remainingAmountMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "remainingAmountMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "tokenMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    isClaimed(
      campaignId: BigNumberish,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isClaimed(uint256,uint256)"(
      campaignId: BigNumberish,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    claim(
      campaignId: BigNumberish,
      index: BigNumberish,
      target: string,
      amount: BigNumberish,
      merkleProof: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;

    "claim(uint256,uint256,string,uint256,bytes32[])"(
      campaignId: BigNumberish,
      index: BigNumberish,
      target: string,
      amount: BigNumberish,
      merkleProof: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Claimed(
      index: null,
      account: null,
      amount: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { index: BigNumber; account: string; amount: BigNumber }
    >;
  };

  estimateGas: {
    merkleRootMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "merkleRootMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    remainingAmountMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "remainingAmountMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "tokenMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isClaimed(
      campaignId: BigNumberish,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isClaimed(uint256,uint256)"(
      campaignId: BigNumberish,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claim(
      campaignId: BigNumberish,
      index: BigNumberish,
      target: string,
      amount: BigNumberish,
      merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "claim(uint256,uint256,string,uint256,bytes32[])"(
      campaignId: BigNumberish,
      index: BigNumberish,
      target: string,
      amount: BigNumberish,
      merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    merkleRootMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "merkleRootMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    remainingAmountMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "remainingAmountMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenMap(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenMap(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isClaimed(
      campaignId: BigNumberish,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isClaimed(uint256,uint256)"(
      campaignId: BigNumberish,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claim(
      campaignId: BigNumberish,
      index: BigNumberish,
      target: string,
      amount: BigNumberish,
      merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "claim(uint256,uint256,string,uint256,bytes32[])"(
      campaignId: BigNumberish,
      index: BigNumberish,
      target: string,
      amount: BigNumberish,
      merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}