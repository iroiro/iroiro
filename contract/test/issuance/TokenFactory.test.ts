import {
  constants,
  ContractFactory,
  ContractTransaction,
  Signer,
} from "ethers";
import { ethers } from "hardhat";
import { SocialToken, TokenFactory, TreasuryVester } from "../../types";
import { assert, expect } from "chai";

const getTokenAndCreatorFromTransaction = async (
  tx: ContractTransaction
): Promise<{
  token: string;
  creator: string;
}> => {
  const receipt = await tx.wait();
  if (receipt.events === undefined) {
    assert.fail();
  }
  const transferEvent = receipt.events.find(
    (event) => event.event === "CreateToken"
  );
  if (transferEvent === undefined || transferEvent.args === undefined) {
    assert.fail();
  }
  return {
    token: transferEvent.args.token,
    creator: transferEvent.args.creator,
  };
};

describe("TokenFactory", () => {
  let owner: Signer,
    creator: Signer,
    donatee: Signer,
    operator: Signer,
    creatorFund: Signer;
  let vester: TreasuryVester;
  let factory: TokenFactory;
  let SocialToken: ContractFactory;

  const totalSupply = constants.WeiPerEther.mul(10000000);

  beforeEach(async function () {
    const Vester: ContractFactory = await ethers.getContractFactory(
      "TreasuryVester"
    );
    const TokenFactory: ContractFactory = await ethers.getContractFactory(
      "TokenFactory"
    );
    SocialToken = await ethers.getContractFactory("SocialToken");
    [
      owner,
      creator,
      donatee,
      operator,
      creatorFund,
    ] = await ethers.getSigners();

    vester = (await Vester.deploy()) as TreasuryVester;
    factory = (await TokenFactory.deploy(
      await operator.getAddress(),
      await donatee.getAddress(),
      await creatorFund.getAddress(),
      vester.address
    )) as TokenFactory;

    await vester.transferOwnership(factory.address);
  });

  describe("constructor", () => {
    it("emit operator event", async () => {
      const events = await factory.queryFilter(
        factory.filters.UpdateOperator(null)
      );
      const updateEvent = events.find(
        (event) => event.event === "UpdateOperator"
      );
      if (updateEvent === undefined || updateEvent.args === undefined) {
        assert.fail();
      }
      expect(updateEvent.args.operator).to.equal(await operator.getAddress());
    });

    it("emit donatee event", async () => {
      const events = await factory.queryFilter(
        factory.filters.UpdateDonatee(null)
      );
      const updateEvent = events.find(
        (event) => event.event === "UpdateDonatee"
      );
      if (updateEvent === undefined || updateEvent.args === undefined) {
        assert.fail();
      }
      expect(updateEvent.args.donatee).to.equal(await donatee.getAddress());
    });

    it("emit creator fund event", async () => {
      const events = await factory.queryFilter(
        factory.filters.UpdateCreatorFund(null)
      );
      const updateEvent = events.find(
        (event) => event.event === "UpdateCreatorFund"
      );
      if (updateEvent === undefined || updateEvent.args === undefined) {
        assert.fail();
      }
      expect(updateEvent.args.creatorFund).to.equal(
        await creatorFund.getAddress()
      );
    });

    it("emit treasury vester event", async () => {
      const events = await factory.queryFilter(
        factory.filters.UpdateTreasuryVester(null)
      );
      const updateEvent = events.find(
        (event) => event.event === "UpdateTreasuryVester"
      );
      if (updateEvent === undefined || updateEvent.args === undefined) {
        assert.fail();
      }
      expect(updateEvent.args.treasuryVester).to.equal(vester.address);
    });
  });

  describe("createToken", () => {
    describe("success case", () => {
      it("success with zero donation ratio", async () => {
        await factory.createToken("SocialToken", "SCL", 0);
      });

      it("success with normal donation ratio", async () => {
        await factory.createToken("SocialToken", "SCL", 500);
      });

      it("success with max donation ratio", async () => {
        await factory.createToken("SocialToken", "SCL", 8000);
      });

      it("emit event", async () => {
        const tx = await factory
          .connect(creator)
          .createToken("SocialToken", "SCL", 0);
        const {
          token,
          creator: creatorAddress,
        } = await getTokenAndCreatorFromTransaction(tx);
        expect(ethers.utils.isHexString(token)).to.equal(true);
        expect(creatorAddress).to.equal(await creator.getAddress());
      });

      it("create token", async () => {
        const tx = await factory.createToken("SocialToken", "SCL", 0);
        const {
          token: tokenAddress1,
        } = await getTokenAndCreatorFromTransaction(tx);
        const token1 = SocialToken.attach(tokenAddress1) as SocialToken;
        expect(await token1.name()).to.equal("SocialToken");
        expect(await token1.symbol()).to.equal("SCL");
        expect((await token1.totalSupply()).toString()).to.equal(
          totalSupply.toString()
        );

        const {
          token: tokenAddress2,
        } = await getTokenAndCreatorFromTransaction(
          await factory.createToken("AnotherToken", "ANT", 0)
        );
        const token2 = SocialToken.attach(tokenAddress2) as SocialToken;
        expect(await token2.name()).to.equal("AnotherToken");
        expect(await token2.symbol()).to.equal("ANT");
        expect((await token2.totalSupply()).toString()).to.equal(
          totalSupply.toString()
        );
      });

      it("send 20% of token to msg.sender", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory.connect(creator).createToken("SocialToken", "SCL", 0)
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const creatorReceived = await token.balanceOf(
          await creator.getAddress()
        );
        expect(ethers.utils.formatEther(creatorReceived)).to.equal("2000000.0");
        expect(creatorReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          20
        );
      });

      it("send no token to operator", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory.connect(creator).createToken("SocialToken", "SCL", 0)
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        expect(await token.balanceOf(await operator.getAddress())).to.equal(
          "0"
        );
      });

      it("send 80% of token to treasury vester", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory.connect(creator).createToken("SocialToken", "SCL", 0)
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const vesterReceived = await token.balanceOf(vester.address);
        expect(ethers.utils.formatEther(vesterReceived)).to.equal("8000000.0");
        expect(vesterReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          80
        );
      });

      it("send no token to donatees and creatorFund if donation ratio is not assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory.connect(creator).createToken("SocialToken", "SCL", 0)
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        expect(
          (await token.balanceOf(await donatee.getAddress())).toString()
        ).to.equal("0");
        expect(
          (await token.balanceOf(await creatorFund.getAddress())).toString()
        ).to.equal("0");
      });

      it("send 5 % of token to donatees and creatorFund if donation ratio is assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory.connect(creator).createToken("SocialToken", "SCL", 500)
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const donateeReceived = await token.balanceOf(
          await donatee.getAddress()
        );
        expect(ethers.utils.formatEther(donateeReceived)).to.equal("250000.0");
        const creatorFundReceived = await token.balanceOf(
          await creatorFund.getAddress()
        );
        expect(ethers.utils.formatEther(creatorFundReceived)).to.equal(
          "250000.0"
        );
        expect(
          donateeReceived
            .add(creatorFundReceived)
            .mul(100)
            .div(totalSupply)
            .toNumber()
        ).to.equal(5);
      });

      it("vesting token is decreased if donation ratio is assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory.connect(creator).createToken("SocialToken", "SCL", 500)
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const vesterReceived = await token.balanceOf(vester.address);
        expect(ethers.utils.formatEther(vesterReceived)).to.equal("7500000.0");
        expect(vesterReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          75
        );
      });

      it("token amount creator received is not affected if donation ratio is assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory.connect(creator).createToken("SocialToken", "SCL", 500)
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const creatorReceived = await token.balanceOf(
          await creator.getAddress()
        );
        expect(ethers.utils.formatEther(creatorReceived)).to.equal("2000000.0");
        expect(creatorReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          20
        );
      });

      it("vesting is added", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory.connect(creator).createToken("CreatorToken", "CRE", 0)
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        expect(
          ethers.utils.formatEther(await token.balanceOf(vester.address))
        ).to.equal("8000000.0");
        expect(await vester.tokensRecipient(tokenAddress)).to.equal(
          await creator.getAddress()
        );
        const start = (
          await vester.tokensVestingStart(tokenAddress)
        ).toNumber();
        const end = (await vester.tokensVestingEnd(tokenAddress)).toNumber();
        expect(end).to.equal(start + 3 * 365 * 24 * 60 * 60);
        expect(
          (await vester.tokensLastUpdate(tokenAddress)).toNumber()
        ).to.equal(start);
      });
    });

    describe("failed case", () => {
      it("create a new token with exceeded donation ratio", async () => {
        await expect(
          factory.createToken("SocialToken", "SCL", 8001)
        ).to.be.revertedWith("SafeMath: subtraction overflow");
      });
    });
  });

  describe("createExclusiveToken", () => {
    describe("success case", () => {
      it("success with zero donation ratio", async () => {
        await factory
          .connect(operator)
          .createExclusiveToken(
            await creator.getAddress(),
            "SocialToken",
            "SCL",
            0,
            0
          );
      });

      it("success with normal donation ratio", async () => {
        await factory
          .connect(operator)
          .createExclusiveToken(
            await creator.getAddress(),
            "SocialToken",
            "SCL",
            500,
            0
          );
      });

      it("success with normal operation ratio", async () => {
        await factory
          .connect(operator)
          .createExclusiveToken(
            await creator.getAddress(),
            "SocialToken",
            "SCL",
            0,
            500
          );
      });

      it("success with normal donation and operation ratio", async () => {
        await factory
          .connect(operator)
          .createExclusiveToken(
            await creator.getAddress(),
            "SocialToken",
            "SCL",
            500,
            500
          );
      });

      it("success with max donation ratio", async () => {
        await factory
          .connect(operator)
          .createExclusiveToken(
            await creator.getAddress(),
            "SocialToken",
            "SCL",
            8000,
            0
          );
      });

      it("success with max operation ratio", async () => {
        await factory
          .connect(operator)
          .createExclusiveToken(
            await creator.getAddress(),
            "SocialToken",
            "SCL",
            0,
            2000
          );
      });

      it("success with max donation and operation ratio", async () => {
        await factory
          .connect(operator)
          .createExclusiveToken(
            await creator.getAddress(),
            "SocialToken",
            "SCL",
            8000,
            2000
          );
      });

      it("emit event", async () => {
        const tx = await factory
          .connect(operator)
          .createExclusiveToken(
            await creator.getAddress(),
            "SocialToken",
            "SCL",
            0,
            0
          );
        const {
          token,
          creator: creatorAddress,
        } = await getTokenAndCreatorFromTransaction(tx);
        expect(ethers.utils.isHexString(token)).to.equal(true);
        expect(creatorAddress).to.equal(await creator.getAddress());
      });

      it("send 20% of token to creator", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              0
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const creatorReceived = await token.balanceOf(
          await creator.getAddress()
        );
        expect(ethers.utils.formatEther(creatorReceived)).to.equal("2000000.0");
        expect(creatorReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          20
        );
      });

      it("send no token to operator if operation ratio is zero", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              0
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        expect(await token.balanceOf(await operator.getAddress())).to.equal(
          "0"
        );
      });

      it("send no token to operator if operation ratio is not zero", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              500
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const operatorReceived = await token.balanceOf(
          await operator.getAddress()
        );
        expect(ethers.utils.formatEther(operatorReceived)).to.equal("500000.0");
        expect(operatorReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          5
        );
      });

      it("send 80% of token to treasury vester", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              0
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const vesterReceived = await token.balanceOf(vester.address);
        expect(ethers.utils.formatEther(vesterReceived)).to.equal("8000000.0");
        expect(vesterReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          80
        );
      });

      it("send no token to donatees and creatorFund if donation ratio is not assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              0
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        expect(
          (await token.balanceOf(await donatee.getAddress())).toString()
        ).to.equal("0");
        expect(
          (await token.balanceOf(await creatorFund.getAddress())).toString()
        ).to.equal("0");
      });

      it("send 5 % of token to donatees and creatorFund if donation ratio is assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              500,
              0
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const donateeReceived = await token.balanceOf(
          await donatee.getAddress()
        );
        expect(ethers.utils.formatEther(donateeReceived)).to.equal("250000.0");
        const creatorFundReceived = await token.balanceOf(
          await creatorFund.getAddress()
        );
        expect(ethers.utils.formatEther(creatorFundReceived)).to.equal(
          "250000.0"
        );
        expect(
          donateeReceived
            .add(creatorFundReceived)
            .mul(100)
            .div(totalSupply)
            .toNumber()
        ).to.equal(5);
      });

      it("creator token is decreased if operation ratio is assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              500
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const received = await token.balanceOf(await creator.getAddress());
        expect(ethers.utils.formatEther(received)).to.equal("1500000.0");
        expect(received.mul(100).div(totalSupply).toNumber()).to.equal(15);
      });

      it("token amount vester received is not affected if operation ratio is assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              500
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const received = await token.balanceOf(vester.address);
        expect(ethers.utils.formatEther(received)).to.equal("8000000.0");
        expect(received.mul(100).div(totalSupply).toNumber()).to.equal(80);
      });

      it("vesting token is decreased if donation ratio is assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              500,
              0
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const vesterReceived = await token.balanceOf(vester.address);
        expect(ethers.utils.formatEther(vesterReceived)).to.equal("7500000.0");
        expect(vesterReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          75
        );
      });

      it("token amount creator received is not affected if donation ratio is assigned", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              500,
              0
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        const creatorReceived = await token.balanceOf(
          await creator.getAddress()
        );
        expect(ethers.utils.formatEther(creatorReceived)).to.equal("2000000.0");
        expect(creatorReceived.mul(100).div(totalSupply).toNumber()).to.equal(
          20
        );
      });

      it("vesting is added", async () => {
        const { token: tokenAddress } = await getTokenAndCreatorFromTransaction(
          await factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              0
            )
        );
        const token = SocialToken.attach(tokenAddress) as SocialToken;
        expect(
          ethers.utils.formatEther(await token.balanceOf(vester.address))
        ).to.equal("8000000.0");
        expect(await vester.tokensRecipient(tokenAddress)).to.equal(
          await creator.getAddress()
        );
        const start = (
          await vester.tokensVestingStart(tokenAddress)
        ).toNumber();
        const end = (await vester.tokensVestingEnd(tokenAddress)).toNumber();
        expect(end).to.equal(start + 3 * 365 * 24 * 60 * 60);
        expect(
          (await vester.tokensLastUpdate(tokenAddress)).toNumber()
        ).to.equal(start);
      });
    });

    describe("failed case", () => {
      it("create a new token with exceeded donation ratio", async () => {
        await expect(
          factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              8001,
              0
            )
        ).to.be.revertedWith("SafeMath: subtraction overflow");
      });

      it("create a new token with exceeded operation ratio", async () => {
        await expect(
          factory
            .connect(operator)
            .createExclusiveToken(
              await creator.getAddress(),
              "SocialToken",
              "SCL",
              0,
              2001
            )
        ).to.be.revertedWith("SafeMath: subtraction overflow");
      });
    });
  });
});
