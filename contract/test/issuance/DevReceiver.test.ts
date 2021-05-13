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
import { DevReceiver, ERC20BurnableMock, ERC20Mock } from "../../types";
import * as dotenv from "dotenv";
import { Network } from "hardhat/types";
dotenv.config();

const increaseDevReward = async (network: Network) => {
  await network.provider.request({
    method: "evm_mine",
    params: [],
  });
};

describe("DevReceiver", function () {
  let author: Signer, alice: Signer, bob: Signer;
  let receiver: DevReceiver;
  let communityToken: ERC20BurnableMock;
  let propertyToken: ERC20Mock;
  let devToken: ERC20Mock;
  let DevReceiverFactory: ContractFactory;
  let ERC20MockFactory: ContractFactory;
  let ERC20BurnableMockFactory: ContractFactory;
  const propertyTokenAddress = "0x3059bD281418179A83cAE3771b0dD6C47807EA3a";
  const devTokenAddress = "0x5caf454ba92e6f2c929df14667ee360ed9fd5b26";

  beforeEach(async () => {
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

    receiver = (await DevReceiverFactory.connect(
      author
    ).deploy()) as DevReceiver;
    await receiver.initialize(
      communityToken.address,
      propertyTokenAddress,
      await author.getAddress()
    );

    propertyToken = (await ERC20MockFactory.attach(
      propertyTokenAddress
    )) as ERC20Mock;
    await propertyToken
      .connect(author)
      .transfer(receiver.address, ethers.utils.parseEther("1000000"));
  });

  afterEach(async () => {
    const propertyBalance = await propertyToken.balanceOf(receiver.address);
    if (!propertyBalance.isZero()) {
      await receiver.rescue(propertyToken.address);
    }
    const devBalance = await devToken.balanceOf(receiver.address);
    if (!devBalance.isZero()) {
      await receiver.rescue(devTokenAddress);
    }
  });

  it("returns a community token address", async () => {
    expect(await receiver.communityToken()).to.equal(communityToken.address);
  });

  it("returns a property token address", async () => {
    expect(await receiver.propertyToken()).to.equal(propertyTokenAddress);
  });

  describe("withdrawableAmount", () => {
    beforeEach(async () => {
      await increaseDevReward(network);
    });

    it("returns zero if account has no community token", async () => {
      const amount = await receiver.connect(author).withdrawableAmount(0);
      expect(amount.toString()).to.equals("0");
    });

    it("returns positive value if account has 10% of community token", async () => {
      const amount = await receiver
        .connect(author)
        .withdrawableAmount(ethers.utils.parseEther("1000000"));
      expect(amount.toString()).to.equals("6855207692364");
    });

    it("returns positive value if account has 20% of community token", async () => {
      const amount = await receiver
        .connect(author)
        .withdrawableAmount(ethers.utils.parseEther("2000000"));
      expect(amount.toString()).to.equals("13710415384729");
    });

    it("returns positive value if account has 100% of community token", async () => {
      const amount = await receiver
        .connect(author)
        .withdrawableAmount(ethers.utils.parseEther("10000000"));
      expect(amount.toString()).to.equals("68552076924055");
    });
  });

  describe("withdraw", () => {
    beforeEach(async () => {
      await increaseDevReward(network);
    });

    it("send withdrawn DEV to claimer", async () => {
      await communityToken.approve(
        receiver.address,
        await communityToken.balanceOf(await author.getAddress())
      );
      await receiver.withdraw(
        await communityToken.balanceOf(await author.getAddress())
      );
      expect(
        (await devToken.balanceOf(await author.getAddress())).toString()
      ).to.be.equals("205656230771346");
    });

    it("community token is burnt", async () => {
      await communityToken.approve(
        receiver.address,
        await communityToken.balanceOf(await author.getAddress())
      );
      await receiver.withdraw(
        await communityToken.balanceOf(await author.getAddress())
      );
      expect((await communityToken.totalSupply()).toString()).to.be.equals("0");
    });

    it("property token balance is not changed", async () => {
      await communityToken.approve(
        receiver.address,
        await communityToken.balanceOf(await author.getAddress())
      );
      const prevBalance = await propertyToken.balanceOf(receiver.address);
      await receiver.withdraw(
        await communityToken.balanceOf(await author.getAddress())
      );
      const newBalance = await propertyToken.balanceOf(receiver.address);
      expect(newBalance.sub(prevBalance).toString()).to.be.equals("0");
    });

    it("anyone who holds community token is able to withdraw", async () => {
      await communityToken.transfer(
        await alice.getAddress(),
        await communityToken.balanceOf(await author.getAddress())
      );
      await communityToken
        .connect(alice)
        .approve(
          receiver.address,
          await communityToken.balanceOf(await alice.getAddress())
        );
      await receiver
        .connect(alice)
        .withdraw(await communityToken.balanceOf(await alice.getAddress()));
    });

    it("throws an error if allowance is insufficient", async () => {
      await expect(receiver.withdraw(1)).to.be.revertedWith(
        " ERC20: burn amount exceeds allowance"
      );
    });

    it("DEV is withdrawable even if contract has no property token", async () => {
      await communityToken.approve(
        receiver.address,
        await communityToken.balanceOf(await author.getAddress())
      );
      await increaseDevReward(network);
      await receiver.rescue(propertyTokenAddress);
      expect(
        (await propertyToken.balanceOf(receiver.address)).toString()
      ).to.equals("0");
      await receiver.withdraw(
        await communityToken.balanceOf(await author.getAddress())
      );
      expect(
        (await devToken.balanceOf(await author.getAddress())).toString()
      ).to.be.equals("891177000024995");
    });
  });

  describe("rescue", () => {
    it("transfer property token to property author by author", async () => {
      expect(
        ethers.utils.formatEther(
          await propertyToken.balanceOf(await author.getAddress())
        )
      ).to.equals("8250000.0");
      await receiver.rescue(propertyTokenAddress);
      expect(
        ethers.utils.formatEther(
          await propertyToken.balanceOf(await author.getAddress())
        )
      ).to.equals("9250000.0");
    });

    it("throw an error if non-author try to transfer property token", async () => {
      await expect(
        receiver.connect(alice).rescue(propertyTokenAddress)
      ).to.be.revertedWith("Only property author is able to rescue token");
    });

    it("withdraw DEV reward before transfer and then transfer to msg.sender", async () => {
      expect(
        (await devToken.balanceOf(await author.getAddress())).toString()
      ).to.equals("891177000024995");
      await receiver.connect(author).rescue(devTokenAddress);
      expect(
        (await devToken.balanceOf(await author.getAddress())).toString()
      ).to.equals("959729076951915");
    });

    it("withdraw is skipped and gas is saved before transfer if there is no DEV reward", async () => {
      await receiver.rescue(propertyTokenAddress);
      await receiver.withdraw(0);
      await receiver.connect(author).rescue(devTokenAddress);
    });
  });
});
