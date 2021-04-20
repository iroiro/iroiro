import { assert, expect } from "chai";
import { constants, ContractFactory, providers, Signer } from "ethers";
import { ethers, waffle } from "hardhat";
import { ERC20, SocialToken, TreasuryVester } from "../../types";

const provider = waffle.provider;

const mineBlock = async (
  provider: providers.Web3Provider,
  timestamp: number
) => {
  await provider.send("evm_mine", [timestamp]);
};

describe("Vesting", () => {
  let owner: Signer, alice: Signer, bob: Signer;
  let creator: Signer;
  let operator: Signer;
  let donatee: Signer;
  let creatorFund: Signer;
  let socialToken: SocialToken;
  let unusedToken: SocialToken;
  let simpleToken: ERC20;
  let vester: TreasuryVester;

  beforeEach(async () => {
    const SocialToken: ContractFactory = await ethers.getContractFactory(
      "SocialToken"
    );
    const ERC20: ContractFactory = await ethers.getContractFactory("ERC20");
    const Vester: ContractFactory = await ethers.getContractFactory(
      "TreasuryVester"
    );
    [
      owner,
      alice,
      bob,
      creator,
      operator,
      donatee,
      creatorFund,
    ] = await ethers.getSigners();
    socialToken = (await SocialToken.deploy()) as SocialToken;
    vester = (await Vester.deploy()) as TreasuryVester;
    await socialToken.initialize(
      "SocialToken",
      "SCL",
      await creator.getAddress(),
      await operator.getAddress(),
      await donatee.getAddress(),
      vester.address,
      await creatorFund.getAddress(),
      0,
      0,
      0
    );
    unusedToken = (await SocialToken.deploy()) as SocialToken;
    await unusedToken.initialize(
      "UnusedToken",
      "UN",
      await creator.getAddress(),
      await operator.getAddress(),
      await donatee.getAddress(),
      vester.address,
      await creatorFund.getAddress(),
      0,
      0,
      0
    );
    simpleToken = (await ERC20.deploy("Simple", "SMP")) as SocialToken;
    expect(
      ethers.utils
        .formatUnits(await socialToken.balanceOf(vester.address))
        .toString()
    ).to.equal("8000000.0");
  });

  describe("addVesting", () => {
    describe("3 years", () => {
      it("register token as vesting", async () => {
        expect(await vester.vestingTokens(socialToken.address)).to.equal(false);
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        expect(await vester.vestingTokens(socialToken.address)).to.equal(true);
      });

      it("throw error when sender is not a owner", async () => {
        await expect(
          vester.connect(alice).addVesting(
            socialToken.address,
            await alice.getAddress(),

            3
          )
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("throw error when trying add token already registered", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        await expect(
          vester.addVesting(
            socialToken.address,
            await alice.getAddress(),

            3
          )
        ).to.be.revertedWith("Token is already registered");
      });

      it("increment token amount", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        expect(
          ethers.utils
            .formatUnits(await vester.tokensVestingAmount(socialToken.address))
            .toString()
        ).to.equal("8000000.0");
      });

      it("register account as recipient", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        expect(await vester.tokensRecipient(socialToken.address)).to.equal(
          await alice.getAddress()
        );
      });

      it("register start time", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        const now = (await provider.getBlock("latest")).timestamp;
        expect(await vester.tokensVestingStart(socialToken.address)).to.equal(
          now.toString()
        );
      });

      it("register end time", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        const now = (await provider.getBlock("latest")).timestamp;
        const end = now + 60 * 60 * 24 * 365 * 3;
        expect(await vester.tokensVestingEnd(socialToken.address)).to.equal(
          end.toString()
        );
      });

      it("register update time", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        const now = (await provider.getBlock("latest")).timestamp;
        expect(await vester.tokensLastUpdate(socialToken.address)).to.equal(
          now.toString()
        );
      });
    });

    describe("5 years", () => {
      it("register end time", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          5
        );
        const now = (await provider.getBlock("latest")).timestamp;
        const end = now + 60 * 60 * 24 * 365 * 5;
        expect(await vester.tokensVestingEnd(socialToken.address)).to.equal(
          end.toString()
        );
      });
    });

    describe("0 years", () => {
      it("failed to add vesting", async () => {
        await expect(
          vester.addVesting(
            socialToken.address,
            await alice.getAddress(),

            0
          )
        ).to.be.revertedWith("Vesting years should be positive");
      });
    });
  });

  describe("redeem", () => {
    describe("3 years", () => {
      it("throw an error when token is not registered", async () => {
        await expect(vester.redeem(unusedToken.address)).to.be.revertedWith(
          "ERC20: transfer to the zero address"
        );
      });

      it("throw an error when token is passed as zero address", async () => {
        await expect(vester.redeem(constants.AddressZero)).to.be.revertedWith(
          "function call to a non-contract account"
        );
      });

      it("redeem tiny amount token", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        await vester.redeem(socialToken.address);
        const recipient = await vester.tokensRecipient(socialToken.address); // alice

        const recipientBalance = (
          await socialToken.balanceOf(recipient)
        ).toString();
        expect(recipientBalance).to.equal("84559445290038897");
      });

      it("redeem partial token", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        const now = (await provider.getBlock("latest")).timestamp;
        const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
        await mineBlock(provider, now + (threeYearsLater - now) / 2);
        const minedTime = (await provider.getBlock("latest")).timestamp;
        console.debug("Passed time: ", minedTime - now);
        await vester.redeem(socialToken.address);
        const recipient = await vester.tokensRecipient(socialToken.address); // alice

        const recipientBalance = (
          await socialToken.balanceOf(recipient)
        ).toString();
        expect(recipientBalance).to.equal("4000000084559445290038897");
      });

      it("update last update", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        const now = (await provider.getBlock("latest")).timestamp;
        const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
        await mineBlock(provider, now + (threeYearsLater - now) / 2);
        const minedTime = (await provider.getBlock("latest")).timestamp;
        console.debug("Passed time: ", minedTime - now);
        await vester.redeem(socialToken.address);
        const updatedTime = (await provider.getBlock("latest")).timestamp;

        expect(
          (await vester.tokensLastUpdate(socialToken.address)).toString()
        ).to.equal(updatedTime.toString());
      });

      it("redeem all token", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          3
        );
        const now = (await provider.getBlock("latest")).timestamp;
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
        expect(recipientBalance).to.equal("8000000000000000000000000");
      });
    });

    describe("5 years", () => {
      it("redeem tiny amount token", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          5
        );
        await vester.redeem(socialToken.address);
        const recipient = await vester.tokensRecipient(socialToken.address); // alice

        const recipientBalance = (
          await socialToken.balanceOf(recipient)
        ).toString();
        expect(recipientBalance).to.equal("50735667174023338");
      });

      it("redeem partial token", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          5
        );
        const now = (await provider.getBlock("latest")).timestamp;
        const threeYearsLater = now + 60 * 60 * 24 * 365 * 5;
        await mineBlock(provider, now + (threeYearsLater - now) / 2);
        const minedTime = (await provider.getBlock("latest")).timestamp;
        console.debug("Passed time: ", minedTime - now);
        await vester.redeem(socialToken.address);
        const recipient = await vester.tokensRecipient(socialToken.address); // alice

        const recipientBalance = (
          await socialToken.balanceOf(recipient)
        ).toString();
        expect(recipientBalance).to.equal("4000000050735667174023338");
      });

      it("redeem all token", async () => {
        await vester.addVesting(
          socialToken.address,
          await alice.getAddress(),
          5
        );
        const now = (await provider.getBlock("latest")).timestamp;
        const threeYearsLater = now + 60 * 60 * 24 * 365 * 5;
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
        expect(recipientBalance).to.equal("8000000000000000000000000");
      });
    });
  });

  describe("remainingAmount", () => {
    it("returns zero when token is not registered", async () => {
      expect(
        (await vester.remainingAmountOf(simpleToken.address)).toString()
      ).to.equal("0");
    });

    it("a lot of token is remaining just after adding vesting and redeem", async () => {
      await vester.addVesting(socialToken.address, await alice.getAddress(), 3);
      await vester.redeem(socialToken.address);

      const remainingAmount = (
        await vester.remainingAmountOf(socialToken.address)
      ).toString();
      expect(remainingAmount).to.equal("7999999915440554709961103");
    });

    it("redeem partial token", async () => {
      await vester.addVesting(socialToken.address, await alice.getAddress(), 3);
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);
      await vester.redeem(socialToken.address);

      const remainingAmount = (
        await vester.remainingAmountOf(socialToken.address)
      ).toString();
      expect(remainingAmount).to.equal("3999999915440554709961103");
    });

    it("redeem all token", async () => {
      await vester.addVesting(socialToken.address, await alice.getAddress(), 3);
      const now = (await provider.getBlock("latest")).timestamp;
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
      await vester.addVesting(socialToken.address, await alice.getAddress(), 3);
      const now = (await provider.getBlock("latest")).timestamp;
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (
        await vester.redeemableAmountOf(socialToken.address)
      ).toString();
      expect(redeemableAmount).to.equal("0");
    });

    it("all token is redeemable after vesting half period is finished", async () => {
      await vester.addVesting(socialToken.address, await alice.getAddress(), 3);
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, now + (threeYearsLater - now) / 2);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (
        await vester.redeemableAmountOf(socialToken.address)
      ).toString();
      expect(redeemableAmount).to.equal("4000000000000000000000000");
    });

    it("all token is redeemable after vesting period is finished", async () => {
      await vester.addVesting(socialToken.address, await alice.getAddress(), 3);
      const now = (await provider.getBlock("latest")).timestamp;
      const threeYearsLater = now + 60 * 60 * 24 * 365 * 3;
      await mineBlock(provider, threeYearsLater);
      const minedTime = (await provider.getBlock("latest")).timestamp;
      console.debug("Passed time: ", minedTime - now);

      const redeemableAmount = (
        await vester.redeemableAmountOf(socialToken.address)
      ).toString();
      expect(redeemableAmount).to.equal("8000000000000000000000000");
    });
  });
});
