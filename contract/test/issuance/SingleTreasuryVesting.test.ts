import { assert, expect } from "chai";
import { constants, ContractFactory, providers, Signer } from "ethers";
import { ethers, waffle } from "hardhat";
import {
  ERC20,
  SocialToken,
  SingleTreasuryVester,
  SingleSocialToken__factory,
  SingleTreasuryVester__factory,
  SingleSocialToken,
} from "../../types";

const provider = waffle.provider;

const mineBlock = async (
  provider: providers.Web3Provider,
  timestamp: number
) => {
  await provider.send("evm_mine", [timestamp]);
};

describe("SingleTreasuryVester", () => {
  let owner: Signer, alice: Signer, bob: Signer;
  let creator: Signer;
  let operator: Signer;
  let donatee: Signer;
  let creatorFund: Signer;
  let socialToken: SingleSocialToken;
  let unusedToken: SingleSocialToken;
  let simpleToken: ERC20;
  let vester: SingleTreasuryVester;
  let baseURI = "https://example.com/base/";

  beforeEach(async () => {
    const SocialToken: SingleSocialToken__factory = (await ethers.getContractFactory(
      "SingleSocialToken"
    )) as SingleSocialToken__factory;
    const ERC20: ContractFactory = await ethers.getContractFactory("ERC20");
    const Vester: SingleTreasuryVester__factory = (await ethers.getContractFactory(
      "SingleTreasuryVester"
    )) as SingleTreasuryVester__factory;
    [owner, alice, bob, creator, operator] = await ethers.getSigners();
    socialToken = (await SocialToken.deploy(
      "SocialToken",
      "SCL",
      baseURI,
      await creator.getAddress(),
      await operator.getAddress(),
      2000
    )) as SingleSocialToken;
    vester = (await Vester.deploy(
      socialToken.address,
      await alice.getAddress(),
      await socialToken.balanceOf(await operator.getAddress()),
      3
    )) as SingleTreasuryVester;

    await socialToken
      .connect(operator)
      .transfer(vester.address, ethers.utils.parseEther("8000000.0"));

    expect(
      ethers.utils
        .formatUnits(await socialToken.balanceOf(vester.address))
        .toString()
    ).to.equal("8000000.0");
  });

  describe("constructor", () => {
    it("register token as vesting", async () => {
      expect(await vester.token()).to.equal(socialToken.address);
    });

    it("increment token amount", async () => {
      expect(
        ethers.utils.formatUnits(await vester.vestingAmount()).toString()
      ).to.equal("8000000.0");
    });

    it("register account as recipient", async () => {
      expect(await vester.recipient()).to.equal(await alice.getAddress());
    });

    it("register start time", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      expect((await vester.vestingStart()).add(1).toString()).to.equal(
        now.toString()
      );
    });

    it("register end time", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const end = now + 60 * 60 * 24 * 365 * 3;
      expect((await vester.vestingEnd()).add(1).toString()).to.equal(
        end.toString()
      );
    });

    it("register update time", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      expect((await vester.lastUpdate()).add(1).toString()).to.equal(
        now.toString()
      );
    });
  });

  describe("redeem", () => {
    it("redeem tiny amount token", async () => {
      await vester.redeem();
      const recipient = await vester.recipient(); // alice

      const recipientBalance = (
        await socialToken.balanceOf(recipient)
      ).toString();
      expect(recipientBalance).to.equal("169118890580077794");
    });

    it("redeem partial token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem();
      const recipient = await vester.recipient(); // alice

      const recipientBalance = (
        await socialToken.balanceOf(recipient)
      ).toString();
      expect(recipientBalance).to.equal("4000000169118890580077794");
    });

    it("update last update", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem();
      const updatedTime = (await provider.getBlock("latest")).timestamp;

      expect((await vester.lastUpdate()).toString()).to.equal(
        updatedTime.toString()
      );
    });

    it("redeem all token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, threeYearsLater);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem();
      const recipient = await vester.recipient(); // alice

      const recipientBalance = (
        await socialToken.balanceOf(recipient)
      ).toString();
      console.debug(
        "Recipient balance after vesting period is finished",
        recipientBalance
      );
      expect(recipientBalance).to.equal("8000000000000000000000000");
    });
  });

  describe("remainingAmount", () => {
    it("a lot of token is remaining just after adding vesting and redeem", async () => {
      await vester.redeem();

      const remainingAmount = (await vester.remainingAmount()).toString();
      expect(remainingAmount).to.equal("7999999830881109419922206");
    });

    it("redeem partial token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem();

      const remainingAmount = (await vester.remainingAmount()).toString();
      expect(remainingAmount).to.equal("3999999830881109419922206");
    });

    it("redeem all token", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, threeYearsLater);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem();

      const remainingAmount = (await vester.remainingAmount()).toString();
      expect(remainingAmount).to.equal("0");
    });
  });

  describe("redeemableAmount", () => {
    it("tiny amount token is redeemable just after vesting is added", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (await vester.redeemableAmount()).toString();
      expect(redeemableAmount).to.equal("84559445290038897");
    });

    it("all token is redeemable after vesting half period is finished", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (await vester.redeemableAmount()).toString();
      expect(redeemableAmount).to.equal("4000000084559445290038897");
    });

    it("all token is redeemable after vesting period is finished", async () => {
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, threeYearsLater);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (await vester.redeemableAmount()).toString();
      expect(redeemableAmount).to.equal("8000000000000000000000000");
    });
  });
});
