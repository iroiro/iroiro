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

interface TokenFactoryInterfaceV1Interface extends ethers.utils.Interface {
  functions: {
    "createToken(string,string,uint16)": FunctionFragment;
    "createExclusiveToken(address,string,string,uint16,uint16)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createExclusiveToken",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createExclusiveToken",
    data: BytesLike
  ): Result;

  events: {
    "CreateToken(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreateToken"): EventFragment;
}

export class TokenFactoryInterfaceV1 extends Contract {
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

  interface: TokenFactoryInterfaceV1Interface;

  functions: {
    createToken(
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createToken(string,string,uint16)"(
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    createExclusiveToken(
      creator: string,
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      operationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createExclusiveToken(address,string,string,uint16,uint16)"(
      creator: string,
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      operationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  createToken(
    name: string,
    symbol: string,
    donationRatio: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createToken(string,string,uint16)"(
    name: string,
    symbol: string,
    donationRatio: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  createExclusiveToken(
    creator: string,
    name: string,
    symbol: string,
    donationRatio: BigNumberish,
    operationRatio: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createExclusiveToken(address,string,string,uint16,uint16)"(
    creator: string,
    name: string,
    symbol: string,
    donationRatio: BigNumberish,
    operationRatio: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    createToken(
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "createToken(string,string,uint16)"(
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createExclusiveToken(
      creator: string,
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      operationRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "createExclusiveToken(address,string,string,uint16,uint16)"(
      creator: string,
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      operationRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    CreateToken(
      token: string | null,
      creator: string | null
    ): TypedEventFilter<[string, string], { token: string; creator: string }>;
  };

  estimateGas: {
    createToken(
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "createToken(string,string,uint16)"(
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    createExclusiveToken(
      creator: string,
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      operationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "createExclusiveToken(address,string,string,uint16,uint16)"(
      creator: string,
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      operationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createToken(
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createToken(string,string,uint16)"(
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    createExclusiveToken(
      creator: string,
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      operationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createExclusiveToken(address,string,string,uint16,uint16)"(
      creator: string,
      name: string,
      symbol: string,
      donationRatio: BigNumberish,
      operationRatio: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}