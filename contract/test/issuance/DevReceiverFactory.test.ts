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

import { expect } from "chai";
import { ContractFactory, Signer } from "ethers";
import { ethers, network } from "hardhat";
import {
  DevReceiver,
  DevReceiver__factory,
  DevReceiverFactory,
  ERC20BurnableMock,
  ERC20Mock,
} from "../../types";
import * as dotenv from "dotenv";
dotenv.config();

describe("DevReceiverFactory", function () {
  let author: Signer, alice: Signer, bob: Signer;
  let factory: DevReceiverFactory;
  let receiver: DevReceiver;
  let communityToken: ERC20BurnableMock;
  let propertyToken: ERC20Mock;
  let devToken: ERC20Mock;
  let FactoryOfDevReceiverFactory: ContractFactory;
  let DevReceiverFactory: ContractFactory;
  let ERC20MockFactory: ContractFactory;
  let ERC20BurnableMockFactory: ContractFactory;
  const propertyTokenAddress = "0x3059bD281418179A83cAE3771b0dD6C47807EA3a";
  const devTokenAddress = "0x5caf454ba92e6f2c929df14667ee360ed9fd5b26";

  beforeEach(async () => {
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            blockNumber: Number.parseInt(process.env?.FORK_BLOCKNUMBER ?? "0"),
          },
        },
      ],
    });

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x0972b8f4ddea155f5cef515a33cfadbc77476d34"],
    });
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"],
    });
    author = await ethers.provider.getSigner(
      "0x0972b8f4ddea155f5cef515a33cfadbc77476d34"
    );
    alice = await ethers.provider.getSigner(
      "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
    );

    DevReceiverFactory = await ethers.getContractFactory("DevReceiver");
    FactoryOfDevReceiverFactory = await ethers.getContractFactory(
      "DevReceiverFactory"
    );
    ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
    ERC20BurnableMockFactory = await ethers.getContractFactory(
      "ERC20BurnableMock"
    );
    communityToken = (await ERC20BurnableMockFactory.connect(author).deploy(
      "CryptoVisor",
      "CRVZ",
      await author.getAddress(),
      ethers.utils.parseEther("10000000")
    )) as ERC20BurnableMock;
    devToken = (await ERC20MockFactory.attach(devTokenAddress)) as ERC20Mock;

    factory = (await FactoryOfDevReceiverFactory.connect(
      author
    ).deploy()) as DevReceiverFactory;
    propertyToken = (
      await ERC20MockFactory.attach(propertyTokenAddress)
    ).connect(author) as ERC20Mock;
  });

  it("create Dev Receiver", async () => {
    await factory.createDevReceiver(
      communityToken.address,
      propertyToken.address
    );
  });

  it("is able to create receiver by author", async () => {
    await factory.createDevReceiver(
      communityToken.address,
      propertyToken.address
    );
  });

  it("is not able to create receiver by non-author user", async () => {
    await expect(
      factory
        .connect(alice)
        .createDevReceiver(communityToken.address, propertyToken.address)
    ).to.be.revertedWith("Only property author is able to create Dev Receiver");
  });

  it("is not able to create receiver by non-author user even user has property token", async () => {
    await propertyToken
      .connect(author)
      .transfer(
        await alice.getAddress(),
        await propertyToken.balanceOf(await author.getAddress())
      );
    await expect(
      factory
        .connect(alice)
        .createDevReceiver(communityToken.address, propertyToken.address)
    ).to.be.revertedWith("Only property author is able to create Dev Receiver");
  });

  it("emit events", async () => {
    const tx = await factory.createDevReceiver(
      communityToken.address,
      propertyToken.address
    );
    const receipt = await tx.wait();
    expect(receipt.events?.[0]?.args?.creator).to.equals(
      await author.getAddress()
    );
    expect(receipt.events?.[0]?.args?.communityToken).to.equals(
      communityToken.address
    );
    expect(receipt.events?.[0]?.args?.propertyToken).to.equals(
      propertyToken.address
    );
    expect(receipt.events?.[0]?.args?.devReceiver).to.not.equals(
      ethers.constants.AddressZero
    );
  });

  it("receiver has a correct community token address", async () => {
    const tx = await factory.createDevReceiver(
      communityToken.address,
      propertyToken.address
    );
    const receipt = await tx.wait();
    receiver = DevReceiverFactory.attach(
      receipt.events?.[0]?.args?.devReceiver
    ) as DevReceiver;
    expect(await receiver.communityToken()).to.equals(communityToken.address);
  });

  it("receiver has a correct property token address", async () => {
    const tx = await factory.createDevReceiver(
      communityToken.address,
      propertyToken.address
    );
    const receipt = await tx.wait();
    receiver = DevReceiverFactory.attach(
      receipt.events?.[0]?.args?.devReceiver
    ) as DevReceiver;
    expect(await receiver.propertyToken()).to.equals(propertyToken.address);
  });

  it("receiver has a correct author address(only author address can be rescue tokens)", async () => {
    const tx = await factory.createDevReceiver(
      communityToken.address,
      propertyToken.address
    );
    const receipt = await tx.wait();
    receiver = DevReceiverFactory.attach(
      receipt.events?.[0]?.args?.devReceiver
    ) as DevReceiver;
    await propertyToken.transfer(
      receiver.address,
      await propertyToken.balanceOf(await author.getAddress())
    );
    await receiver.connect(author).rescue(propertyToken.address);
    await receiver.connect(author).rescue(devTokenAddress);
  });
});
