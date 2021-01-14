const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  time,
} = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Distributor = contract.fromArtifact("WalletDistributor");
const Campaign = contract.fromArtifact("WalletCampaign");
const FanToken = contract.fromArtifact("FanToken");

describe("WalletCampaign", () => {
  const [defaultAccount, alice, bob, consumer, follower, metamask] = accounts;

  let cc, distributor, campaign, abctoken, now, future;

  const merkleRoot =
    "0xdefa96435aec82d201dbd2e5f050fb4e1fef5edac90ce1e03953f916a5e1132d";
  const campaignInfoCid = "campaign info cid";
  const recipientsCid = "recipients cid";
  const recipientsNum = 100;

  beforeEach(async () => {
    distributor = await Distributor.new("Wallet Test Distributor", {
      from: defaultAccount,
    });
    abctoken = await FanToken.new(
      "ABCToken",
      "ABC",
      1000000000,
      defaultAccount,
      5,
      defaultAccount,
      50,
      5,
      { from: defaultAccount }
    );
    await abctoken.transfer(consumer, 1000, { from: defaultAccount });
    await abctoken.approve(distributor.address, 1000, { from: consumer });
    now = await time.latest();
    future = now.add(time.duration.weeks(4));
    await abctoken.approve(distributor.address, 100, { from: defaultAccount });
    await distributor.createCampaign(
      merkleRoot,
      abctoken.address,
      consumer,
      campaignInfoCid,
      recipientsCid,
      recipientsNum,
      now,
      future,
      { from: consumer }
    );
    const campaignAddress = await distributor.campaignList(1);
    cc = await Campaign.at(campaignAddress);
  });

  describe("claim", () => {
    describe("future campaign", () => {
      let futurecc;
      beforeEach(async () => {
        await abctoken.transfer(consumer, 1000, { from: defaultAccount });
        await abctoken.approve(distributor.address, 1000, { from: consumer });
        const oneweeklater = await now.add(time.duration.weeks(1));
        const twoweeklater = await now.add(time.duration.weeks(2));
        await abctoken.approve(distributor.address, 100, {
          from: defaultAccount,
        });
        await distributor.createCampaign(
          merkleRoot,
          abctoken.address,
          consumer,
          campaignInfoCid,
          recipientsCid,
          recipientsNum,
          oneweeklater,
          twoweeklater,
          { from: consumer }
        );
        const futurecampaignaddress = await distributor.campaignList(2);
        futurecc = await Campaign.at(futurecampaignaddress);
      });

      it("throws an error if campaign is not started yet", async () => {
        try {
          await futurecc.claim(
            0,
            "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
            new BN(100),
            []
          );
          assert.fail();
        } catch (error) {
          expect(error.reason).to.equal("Campaign is not started yet");
          assert(true);
        }
      });
    });

    describe("past campaign", () => {
      let pastcc;
      beforeEach(async () => {
        await abctoken.transfer(consumer, 1000, { from: defaultAccount });
        await abctoken.approve(distributor.address, 1000, { from: consumer });
        const now = await time.latest();
        const oneweeklater = await now.add(time.duration.weeks(1));
        await abctoken.approve(distributor.address, 100, {
          from: defaultAccount,
        });
        await distributor.createCampaign(
          merkleRoot,
          abctoken.address,
          consumer,
          campaignInfoCid,
          recipientsCid,
          recipientsNum,
          now,
          oneweeklater,
          { from: consumer }
        );
        const pastcampaignaddress = await distributor.campaignList(2);
        pastcc = await Campaign.at(pastcampaignaddress);
      });

      it("throws an error if campaign is finished", async () => {
        time.increase(time.duration.weeks(2));
        try {
          await pastcc.claim(
            0,
            "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
            new BN(100),
            []
          );
          assert.fail();
        } catch (error) {
          expect(error.reason).to.equal("Campaign is finished");
          assert(true);
        }
      });
    });

    describe("active campaign", () => {
      it("simplest claim", async () => {
        await cc.claim(
          0,
          "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
          new BN(100),
          []
        );
      });

      it("emits event", async () => {
        const receipt = await cc.claim(
          0,
          "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
          new BN(100),
          [],
          { from: alice }
        );
        expectEvent(receipt, "Claim", {
          from: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
          to: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
        });
      });

      xdescribe("complex merkle tree", () => {});
    });
  });
});
