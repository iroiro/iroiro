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
import { BigNumber as EthersBigNumber, ContractFactory, Signer } from "ethers";
import { ethers, network } from "hardhat";
import {
  DevReceiver,
  ERC20BurnableMock,
  ERC20Mock,
  PropertyMock__factory,
} from "../../types";
import * as dotenv from "dotenv";
import { Network } from "hardhat/types";
import BigNumber from "bignumber.js";
dotenv.config();

const increaseDevReward = async (network: Network) => {
  await network.provider.request({
    method: "evm_mine",
    params: [],
  });
};

const getRoundedGwei = (amount: EthersBigNumber) => {
  return new BigNumber(ethers.utils.formatUnits(amount, "gwei"))
    .integerValue(BigNumber.ROUND_DOWN)
    .toFixed();
};

describe("DevReceiver", function () {
  let author: Signer, alice: Signer, owner: Signer, bob: Signer, carol: Signer;
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
    await receiver.initialize(communityToken.address, propertyTokenAddress);

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

  describe("maxWithdrawableAmount", () => {
    describe("not charged yet", () => {
      beforeEach(async () => {
        await increaseDevReward(network);
      });

      it("returns zero if account has no community token", async () => {
        const amount = await receiver.connect(author).maxWithdrawableAmount(0);
        expect(amount.toString()).to.equals("0");
      });

      it("returns positive value if account has 10% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .maxWithdrawableAmount(ethers.utils.parseEther("1000000"));
        expect(getRoundedGwei(amount)).to.equals("6855");
      });

      it("returns positive value if account has 20% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .maxWithdrawableAmount(ethers.utils.parseEther("2000000"));
        expect(getRoundedGwei(amount)).to.equals("13710");
      });

      it("returns positive value if account has 100% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .maxWithdrawableAmount(ethers.utils.parseEther("10000000"));
        expect(getRoundedGwei(amount)).to.equals("68552");
      });
    });

    describe("returns summed up amount of charged reward and uncharged reward", () => {
      beforeEach(async () => {
        await receiver.chargeReward();
        const amount = await devToken.balanceOf(receiver.address);
        expect(getRoundedGwei(amount)).to.equals("68552");
        await increaseDevReward(network);
      });

      it("zero if account has no community token", async () => {
        const amount = await receiver.connect(author).maxWithdrawableAmount(0);
        expect(amount.toString()).to.equals("0");
      });

      it("returns positive value if account has 10% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .maxWithdrawableAmount(ethers.utils.parseEther("1000000"));
        expect(getRoundedGwei(amount)).to.equals("13710");
      });

      it("returns positive value if account has 20% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .maxWithdrawableAmount(ethers.utils.parseEther("2000000"));
        expect(getRoundedGwei(amount)).to.equals("27420");
      });

      it("returns positive value if account has 100% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .maxWithdrawableAmount(ethers.utils.parseEther("10000000"));
        expect(getRoundedGwei(amount)).to.equals("137104");
      });
    });
  });

  describe("actualWithdrawableAmount", () => {
    describe("returns always zero regard less burn amount if not charged yet", () => {
      beforeEach(async () => {
        await increaseDevReward(network);
      });

      it("zero burn amount", async () => {
        const amount = await receiver
          .connect(author)
          .actualWithdrawableAmount(0);
        expect(amount.toString()).to.equals("0");
      });

      it("10% of token to burn", async () => {
        const amount = await receiver
          .connect(author)
          .actualWithdrawableAmount(ethers.utils.parseEther("1000000"));
        expect(getRoundedGwei(amount)).to.equals("0");
      });

      it("20% of token to burn", async () => {
        const amount = await receiver
          .connect(author)
          .actualWithdrawableAmount(ethers.utils.parseEther("2000000"));
        expect(getRoundedGwei(amount)).to.equals("0");
      });

      it("100% of token to burn", async () => {
        const amount = await receiver
          .connect(author)
          .actualWithdrawableAmount(ethers.utils.parseEther("10000000"));
        expect(getRoundedGwei(amount)).to.equals("0");
      });
    });

    describe("charged", () => {
      beforeEach(async () => {
        await receiver.chargeReward();
      });

      it("returns zero if account has no community token", async () => {
        const amount = await receiver
          .connect(author)
          .actualWithdrawableAmount(0);
        expect(amount.toString()).to.equals("0");
      });

      it("returns positive value if account has 10% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .actualWithdrawableAmount(ethers.utils.parseEther("1000000"));
        expect(getRoundedGwei(amount)).to.equals("6855");
      });

      it("returns positive value if account has 20% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .actualWithdrawableAmount(ethers.utils.parseEther("2000000"));
        expect(getRoundedGwei(amount)).to.equals("13710");
      });

      it("returns positive value if account has 100% of community token", async () => {
        const amount = await receiver
          .connect(author)
          .actualWithdrawableAmount(ethers.utils.parseEther("10000000"));
        expect(getRoundedGwei(amount)).to.equals("68552");
      });
    });
  });

  describe("withdraw", () => {
    describe("commons", () => {
      beforeEach(async () => {
        await receiver.chargeReward();
        await increaseDevReward(network);
      });

      it("community token is burnt", async () => {
        await communityToken.approve(
          receiver.address,
          await communityToken.balanceOf(await author.getAddress())
        );
        await receiver.withdraw(
          await communityToken.balanceOf(await author.getAddress())
        );
        expect((await communityToken.totalSupply()).toString()).to.be.equals(
          "0"
        );
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
          getRoundedGwei(await devToken.balanceOf(await author.getAddress()))
        ).to.be.equals("822624");
      });
    });

    describe("not charged", () => {
      it("send non charged amount DEV to claimer", async () => {
        await increaseDevReward(network);
        const amountToBurn = await communityToken.balanceOf(
          await author.getAddress()
        );
        const actualWithdrawableAmount = await receiver.actualWithdrawableAmount(
          amountToBurn
        );
        const maxWithdrawableAmount = await receiver.maxWithdrawableAmount(
          amountToBurn
        );
        expect(
          Number.parseInt(getRoundedGwei(maxWithdrawableAmount))
        ).to.be.greaterThan(
          Number.parseInt(getRoundedGwei(actualWithdrawableAmount))
        );
        expect(getRoundedGwei(actualWithdrawableAmount)).to.equals("0");

        const prevBalance = getRoundedGwei(
          await devToken.balanceOf(await author.getAddress())
        );
        await communityToken.approve(receiver.address, amountToBurn);
        await receiver.withdraw(amountToBurn);
        const newBalance = getRoundedGwei(
          await devToken.balanceOf(await author.getAddress())
        );
        expect(prevBalance).to.equals(newBalance);
      });
    });

    describe("charged", () => {
      beforeEach(async () => {
        await receiver.chargeReward();
        await increaseDevReward(network);
      });

      it("send DEV to claimer", async () => {
        await communityToken.approve(
          receiver.address,
          await communityToken.balanceOf(await author.getAddress())
        );
        await receiver.withdraw(
          await communityToken.balanceOf(await author.getAddress())
        );
        expect(
          getRoundedGwei(await devToken.balanceOf(await author.getAddress()))
        ).to.be.equals("891177");
      });
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

    it("is able to rescue by author if previous author deposited token to contract", async () => {
      const Property = await ethers.getContractFactory("PropertyMock");
      const property = Property.attach(propertyTokenAddress);
      expect(await property.author()).to.equals(await author.getAddress());
      await property.connect(author).changeAuthor(await alice.getAddress());
      expect(await property.author()).to.equals(await alice.getAddress());
      await receiver.connect(alice).rescue(propertyTokenAddress);
      await receiver.connect(alice).rescue(devTokenAddress);
      await property.connect(alice).changeAuthor(await author.getAddress());
    });

    it("throws an error if previous author tried to rescue token", async () => {
      const Property = await ethers.getContractFactory("PropertyMock");
      const property = Property.attach(propertyTokenAddress);
      expect(await property.author()).to.equals(await author.getAddress());
      await property.connect(author).changeAuthor(await alice.getAddress());
      expect(await property.author()).to.equals(await alice.getAddress());
      await expect(
        receiver.connect(author).rescue(propertyTokenAddress)
      ).to.be.revertedWith("Only property author is able to rescue token");
      await expect(
        receiver.connect(author).rescue(devTokenAddress)
      ).to.be.revertedWith("Only property author is able to rescue token");
      await property.connect(alice).changeAuthor(await author.getAddress());
    });
  });

  describe("chargeReward", async () => {
    beforeEach(async () => {
      await increaseDevReward(network);
    });

    it("charge reward to contract", async () => {
      await receiver.chargeReward();
      expect(
        getRoundedGwei(await devToken.balanceOf(receiver.address))
      ).to.be.equals("137104");
    });

    it("charge reward is increased block by block", async () => {
      await increaseDevReward(network);
      await receiver.chargeReward();
      expect(
        getRoundedGwei(await devToken.balanceOf(receiver.address))
      ).to.be.equals("205656");
    });
  });

  describe("chargeableReward", async () => {
    beforeEach(async () => {
      await increaseDevReward(network);
    });

    it("charge reward to contract", async () => {
      const reward = await receiver.chargeableReward();
      expect(getRoundedGwei(reward)).to.be.equals("68552");
    });

    it("charge reward is increased block by block", async () => {
      await increaseDevReward(network);
      const reward = await receiver.chargeableReward();
      expect(getRoundedGwei(reward)).to.be.equals("137104");
    });
  });
});
