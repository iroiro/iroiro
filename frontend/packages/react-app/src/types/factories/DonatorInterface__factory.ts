/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { DonatorInterface } from "../DonatorInterface";

export class DonatorInterface__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<DonatorInterface> {
    return super.deploy(overrides || {}) as Promise<DonatorInterface>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DonatorInterface {
    return super.attach(address) as DonatorInterface;
  }
  connect(signer: Signer): DonatorInterface__factory {
    return super.connect(signer) as DonatorInterface__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DonatorInterface {
    return new Contract(address, _abi, signerOrProvider) as DonatorInterface;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Donate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenDonateeList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "setDonatee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506101b6806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806353b5313614610046578063dcb781321461008a578063e69d849d146100f8575b600080fd5b6100886004803603602081101561005c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610146565b005b6100cc600480360360208110156100a057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610149565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101446004803603604081101561010e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061017c565b005b50565b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b505056fea2646970667358221220b161202dd111030dfba762aa6cf02162bc46225be7baec0ae10cbedb912d723164736f6c634300060c0033";
