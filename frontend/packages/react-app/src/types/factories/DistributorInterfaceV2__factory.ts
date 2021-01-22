/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { DistributorInterfaceV2 } from "../DistributorInterfaceV2";

export class DistributorInterfaceV2__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _distributorInfoCid: string,
    overrides?: Overrides
  ): Promise<DistributorInterfaceV2> {
    return super.deploy(
      _distributorInfoCid,
      overrides || {}
    ) as Promise<DistributorInterfaceV2>;
  }
  getDeployTransaction(
    _distributorInfoCid: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_distributorInfoCid, overrides || {});
  }
  attach(address: string): DistributorInterfaceV2 {
    return super.attach(address) as DistributorInterfaceV2;
  }
  connect(signer: Signer): DistributorInterfaceV2__factory {
    return super.connect(signer) as DistributorInterfaceV2__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DistributorInterfaceV2 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DistributorInterfaceV2;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_distributorInfoCid",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "campaign",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "CreateCampaign",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "campaignList",
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
    inputs: [],
    name: "distributorInfoCid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextCampaignId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
      {
        internalType: "address payable",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
      {
        internalType: "string",
        name: "campaignInfoCid",
        type: "string",
      },
      {
        internalType: "string",
        name: "recipientsCid",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "recipientsNum",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526001805534801561001457600080fd5b506040516105fb3803806105fb8339818101604052602081101561003757600080fd5b810190808051604051939291908464010000000082111561005757600080fd5b8382019150602082018581111561006d57600080fd5b825186600182028301116401000000008211171561008a57600080fd5b8083526020830192505050908051906020019080838360005b838110156100be5780820151818401526020810190506100a3565b50505050905090810190601f1680156100eb5780820380516001836020036101000a031916815260200191505b50604052505050806000908051906020019061010892919061010f565b50506101b4565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061015057805160ff191683800117855561017e565b8280016001018555821561017e579182015b8281111561017d578251825591602001919060010190610162565b5b50905061018b919061018f565b5090565b6101b191905b808211156101ad576000816000905550600101610195565b5090565b90565b610438806101c36000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806323238848146100515780634912c658146100d45780637903a75614610142578063f732153214610160575b600080fd5b610059610321565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009957808201518184015260208101905061007e565b50505050905090810190601f1680156100c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610100600480360360208110156100ea57600080fd5b81019080803590602001909291905050506103bf565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61014a6103f2565b6040518082815260200191505060405180910390f35b61031f600480360361010081101561017757600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156101de57600080fd5b8201836020820111156101f057600080fd5b8035906020019184600183028401116401000000008311171561021257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561027557600080fd5b82018360208201111561028757600080fd5b803590602001918460018302840111640100000000831117156102a957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803563ffffffff16906020019092919080359060200190929190803590602001909291905050506103f8565b005b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103b75780601f1061038c576101008083540402835291602001916103b7565b820191906000526020600020905b81548152906001019060200180831161039a57829003601f168201915b505050505081565b60026020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b505050505050505056fea264697066735822122068c4e1db5e1ba377e45e7e1865f5c24a5a0be84d30877f580bbac62a14f667e364736f6c634300060b0033";
