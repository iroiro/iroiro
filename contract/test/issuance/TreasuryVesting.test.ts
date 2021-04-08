import { assert, expect } from "chai";
import { constants, ContractFactory, providers, Signer } from "ethers";
import { ethers, waffle } from "hardhat";
import { SocialToken, TreasuryVester } from "../../types";

const provider = waffle.provider;

const mineBlock = async (
  provider: providers.Web3Provider,
  timestamp: number
) => {
  await provider.send("evm_mine", [timestamp]);
};

describe("Vesting", () => {
  let owner: Signer, alice: Signer, bob: Signer;
  let socialToken: SocialToken;
  let unusedToken: SocialToken;
  let vester: TreasuryVester;

  const totalSupply = constants.WeiPerEther.mul(10000000);

  beforeEach(async () => {
    const SocialToken: ContractFactory = await ethers.getContractFactory(
      "SocialToken"
    );
    const Vester: ContractFactory = await ethers.getContractFactory(
      "TreasuryVester"
    );
    [owner, alice, bob] = await ethers.getSigners();
    socialToken = (await SocialToken.deploy(
      "SocialToken",
      "SCL",
      await owner.getAddress()
    )) as SocialToken;
    unusedToken = (await SocialToken.deploy(
      "UnusedToken",
      "UN",
      await owner.getAddress()
    )) as SocialToken;

    vester = (await Vester.deploy()) as TreasuryVester;
    await socialToken.transfer(vester.address, await socialToken.totalSupply());
    assert(
      (await socialToken.balanceOf(vester.address)).toString() ===
        totalSupply.toString()
    );
  });

  describe("addVesting", () => {
    it("register token as vesting", async () => {
      expect(await vester.vestingTokens(socialToken.address)).to.equal(false);
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        (await provider.getBlock("latest")).timestamp
      );
      expect(await vester.vestingTokens(socialToken.address)).to.equal(true);
    });

    it("throw error when sender is not a owner", async () => {
      await expect(
        vester
          .connect(alice)
          .addVesting(
            socialToken.address,
            await alice.getAddress(),
            (await provider.getBlock("latest")).timestamp
          )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("throw error when trying add token already registered", async () => {
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        (await provider.getBlock("latest")).timestamp
      );
      await expect(
        vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          (await provider.getBlock("latest")).timestamp
        )
      ).to.be.revertedWith("Token is already registered");
    });

    it("increment token amount", async () => {
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        (await provider.getBlock("latest")).timestamp
      );
      expect(
        (await vester.tokensVestingAmount(socialToken.address)).toString()
      ).to.equal(totalSupply.toString());
    });

    it("register account as recipient", async () => {
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        (await provider.getBlock("latest")).timestamp
      );
      expect(await vester.tokensRecipient(socialToken.address)).to.equal(
        await alice.getAddress()
      );
    });

    it("register account as recipient", async () => {
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        (await provider.getBlock("latest")).timestamp
      );
      expect(await vester.tokensRecipient(socialToken.address)).to.equal(
        await alice.getAddress()
      );
    });
  });

  describe("redeem", () => {
    it("throw an error when token is not registered", async () => {
      await expect(vester.redeem(unusedToken.address)).to.be.revertedWith(
        "Token is not registered"
      );
    });

    it("redeem tiny amount token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        now
      );
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem(socialToken.address);
      const recipient = await vester.tokensRecipient(socialToken.address); // alice

      const recipientBalance = (
        await socialToken.balanceOf(recipient)
      ).toString();
      expect(recipientBalance).to.equal("211398613225097243");
    });

    it("redeem partial token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        now
      );
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem(socialToken.address);
      const recipient = await vester.tokensRecipient(socialToken.address); // alice

      const recipientBalance = (
        await socialToken.balanceOf(recipient)
      ).toString();
      expect(recipientBalance).to.equal("5000000105699306612548621");
    });

    it("redeem all token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        (await provider.getBlock("latest")).timestamp
      );
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, threeYearsLater);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem(socialToken.address);
      const recipient = await vester.tokensRecipient(socialToken.address); // alice

      const recipientBalance = (
        await socialToken.balanceOf(recipient)
      ).toString();
      console.debug(
        "Recipient balance after vesting period is finished",
        recipientBalance
      );
      expect(recipientBalance).to.equal(totalSupply.toString());
    });
  });

  describe("remainingAmount", () => {
    it("returns zero when token is not registered", async () => {
      expect(
        (await vester.remainingAmountOf(unusedToken.address)).toString()
      ).to.equal("0");
    });

    it("a lot of token is remaining just after adding vesting and redeem", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        now
      );
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem(socialToken.address);

      const remainingAmount = (
        await vester.remainingAmountOf(socialToken.address)
      ).toString();
      expect(remainingAmount).to.equal("9999999788601386774902757");
    });

    it("redeem partial token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        now
      );
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem(socialToken.address);

      const remainingAmount = (
        await vester.remainingAmountOf(socialToken.address)
      ).toString();
      expect(remainingAmount).to.equal("4999999894300693387451379");
    });

    it("redeem all token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        (await provider.getBlock("latest")).timestamp
      );
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, threeYearsLater);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem(socialToken.address);

      const remainingAmount = (
        await vester.remainingAmountOf(socialToken.address)
      ).toString();
      expect(remainingAmount).to.equal("0");
    });
  });

  describe("redeemableAmountOf", () => {
    it("tiny amount token is redeemable just after vesting is added", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        now
      );
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (
        await vester.redeemableAmountOf(socialToken.address)
      ).toString();
      expect(redeemableAmount).to.equal("105699306612548621");
    });

    it("all token is redeemable after vesting half period is finished", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        now
      );
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (
        await vester.redeemableAmountOf(socialToken.address)
      ).toString();
      expect(redeemableAmount).to.equal("5000000000000000000000000");
    });

    it("all token is redeemable after vesting period is finished", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      await vester.addVesting(
        socialToken.address,
        await alice.getAddress(),
        (await provider.getBlock("latest")).timestamp
      );
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, threeYearsLater);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (
        await vester.redeemableAmountOf(socialToken.address)
      ).toString();
      expect(redeemableAmount).to.equal("10000000000000000000000000");
    });
  });
});
