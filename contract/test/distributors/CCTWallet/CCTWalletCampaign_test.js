/* eslint-disable @typescript-eslint/no-var-requires */
const { oracle } = require("@chainlink/test-helpers");
const {
  BN,
  expectEvent,
  expectRevert,
  time,
} = require("@openzeppelin/test-helpers");

// TODO Fix tests fail with `truffle test`
contract.skip("CCTWalletCampaign", (accounts) => {
  const { LinkToken } = require("@chainlink/contracts/truffle/v0.4/LinkToken");
  const { Oracle } = require("@chainlink/contracts/truffle/v0.6/Oracle");
  const Distributor = artifacts.require("CCTWalletDistributor.sol");
  const Campaign = artifacts.require("CCTWalletCampaign.sol");
  const FanToken = artifacts.require("FanToken.sol");

  const defaultAccount = accounts[0];
  const oracleNode = accounts[1];
  const stranger = accounts[2];
  const consumer = accounts[3];
  const follower = accounts[4];
  const metamask = accounts[5];

  // These parameters are used to validate the data was received
  // on the deployed oracle contract. The Job ID only represents
  // the type of data, but will not work on a public testnet.
  // For the latest JobIDs, visit our docs here:
  // https://docs.chain.link/docs/testnet-oracles
  const jobId = web3.utils.toHex("4c7b7ffb66b344fbaa64995af81e355a");
  const url =
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,JPY";
  const path = "USD";
  const times = 100;

  // Represents 1 LINK for testnet requests
  const payment = web3.utils.toWei("1");

  let link, oc, cc, distributor, campaign, abctoken, xyztoken, now, future;

  const campaignInfoCid = "campaign info cid";
  const recipientsCid = "recipients cid";
  const recipientsNum = 100;

  let toAddressHash, signature, bytes, r, s, v;

  beforeEach(async () => {
    toAddressHash = web3.utils.soliditySha3(metamask);
    signature = await web3.eth.sign(toAddressHash, follower);
    bytes = web3.utils.hexToBytes(signature);
    r = web3.utils.bytesToHex(bytes.slice(0, 32));
    s = web3.utils.bytesToHex(bytes.slice(32, 64));
    v = web3.utils.hexToNumber(web3.utils.bytesToHex(bytes.slice(-1)));

    link = await LinkToken.new({ from: defaultAccount });
    oc = await Oracle.new(link.address, { from: defaultAccount });
    distributor = await Distributor.new(
      "Audius Test Distributor",
      link.address,
      { from: defaultAccount }
    );
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
    xyztoken = await FanToken.new(
      "XYZToken",
      "XYZ",
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
    receipt = await distributor.createCampaign(
      abctoken.address,
      consumer,
      campaignInfoCid,
      recipientsCid,
      recipientsNum,
      now,
      future,
      { from: consumer }
    );
    campaignAddress = await distributor.campaignList(1);
    cc = await Campaign.at(campaignAddress);
    await oc.setFulfillmentPermission(oracleNode, true, {
      from: defaultAccount,
    });
  });

  describe("#requestCheckingIsClaimable", () => {
    context("without LINK", () => {
      it("reverts", async () => {
        await expectRevert.unspecified(
          cc.requestCheckingIsClaimable(oc.address, jobId, payment, follower, {
            from: metamask,
          })
        );
      });
    });

    context("with LINK", () => {
      let request;

      beforeEach(async () => {
        await link.transfer(metamask, web3.utils.toWei("1", "ether"), {
          from: defaultAccount,
        });
        await link.approve(cc.address, web3.utils.toWei("1", "ether"), {
          from: metamask,
        });
      });

      it("set new user id if its not registered yet", async () => {
        const nextUserIdBefore = await cc.nextUserId();
        assert.equal(nextUserIdBefore.toString(), "1");
        await cc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          follower,
          { from: metamask }
        );
        const userId = await cc.userIdList(follower);
        assert.equal(userId.toString(), "1");
        const nextUserIdAfter = await cc.nextUserId();
        assert.equal(nextUserIdAfter, "2");
      });

      it("set new user address if its not registered yet", async () => {
        const nextUserIdBefore = await cc.nextUserId();
        assert.equal(nextUserIdBefore.toString(), "1");
        await cc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          follower,
          { from: metamask }
        );
        const userAddress = await cc.userList(1);
        assert.equal(userAddress, follower);
      });

      it("does not set new user id if its already registered", async () => {
        await cc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          follower,
          { from: metamask }
        );
        const userId1 = await cc.userIdList(follower);
        assert.equal(userId1, "1");
        const nextUserId1 = await cc.nextUserId();
        assert.equal(nextUserId1, "2");

        await link.transfer(metamask, web3.utils.toWei("1", "ether"), {
          from: defaultAccount,
        });
        await link.approve(cc.address, web3.utils.toWei("1", "ether"), {
          from: metamask,
        });
        await cc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          follower,
          { from: metamask }
        );
        const userId2 = await cc.userIdList(follower);
        assert.equal(userId2, "1");
        const nextUserId2 = await cc.nextUserId();
        assert.equal(nextUserId2, "2");
      });

      context("sending a request to a specific oracle contract address", () => {
        it("triggers a log event in the new Oracle contract", async () => {
          const tx = await cc.requestCheckingIsClaimable(
            oc.address,
            jobId,
            payment,
            follower,
            { from: metamask }
          );
          request = oracle.decodeRunRequest(tx.receipt.rawLogs[4]);
          assert.equal(oc.address, tx.receipt.rawLogs[4].address);
          assert.equal(
            request.topic,
            web3.utils.keccak256(
              "OracleRequest(bytes32,address,bytes32,uint256,address,bytes4,uint256,uint256,bytes)"
            )
          );
        });
      });
    });
  });

  describe("generateClaimKey", () => {
    it("returns claim key", async () => {
      expect((await cc.generateClaimKey(new BN("1"))).toString()).to.equal(
        "11"
      );
    });
  });

  describe("isClaimable", () => {
    it("returns false if user is is not registered", async () => {
      expect(
        await cc.isClaimable(follower, stranger, { from: stranger })
      ).to.equal(false);
    });

    describe("after request", () => {
      beforeEach(async () => {
        const expected1 = web3.utils.soliditySha3(new BN(11));
        const response1 = web3.utils.padLeft(web3.utils.toHex(expected1), 64);
        const expected2 = web3.utils.soliditySha3(new BN(21));
        const response2 = web3.utils.padLeft(web3.utils.toHex(expected2), 64);
        await link.transfer(metamask, web3.utils.toWei("2", "ether"), {
          from: defaultAccount,
        });
        await link.approve(cc.address, web3.utils.toWei("2", "ether"), {
          from: metamask,
        });
        const tx1 = await cc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          follower,
          { from: metamask }
        );
        const request1 = oracle.decodeRunRequest(tx1.receipt.rawLogs[4]);
        await oc.fulfillOracleRequest(
          ...oracle.convertFufillParams(request1, response1, {
            from: oracleNode,
            gas: 500000,
          })
        );
        const tx2 = await cc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          metamask,
          { from: metamask }
        );
        const request2 = oracle.decodeRunRequest(tx2.receipt.rawLogs[4]);
        await oc.fulfillOracleRequest(
          ...oracle.convertFufillParams(request2, response2, {
            from: oracleNode,
            gas: 500000,
          })
        );
      });

      it("returns false if user already claimed", async () => {
        const beforeClaim = await cc.isClaimable(follower, metamask);
        assert.equal(beforeClaim, true);
        await cc.claim(toAddressHash, r, s, v, follower, metamask, {
          from: metamask,
        });
        const afterClaim = await cc.isClaimable(follower, metamask);
        assert.equal(afterClaim, false);
      });

      it("returns false if user already sent token", async () => {
        const beforeClaim1 = await cc.isClaimable(follower, metamask);
        assert.equal(beforeClaim1, true);
        const beforeClaim2 = await cc.isClaimable(metamask, metamask);
        assert.equal(beforeClaim2, true);
        await cc.claim(toAddressHash, r, s, v, follower, metamask, {
          from: metamask,
        });
        const afterClaim = await cc.isClaimable(metamask, metamask);
        assert.equal(afterClaim, false);
      });

      it("returns false if claim hash is not matched", async () => {
        const isClaimable = await cc.isClaimable(stranger, stranger);
        assert.equal(isClaimable, false);
      });

      it("returns true if claim hash is matched", async () => {
        const isClaimable = await cc.isClaimable(follower, metamask);
        assert.equal(isClaimable, true);
      });
    });
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
        receipt = await distributor.createCampaign(
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
        const expected = web3.utils.soliditySha3(new BN(11));
        const response = web3.utils.padLeft(web3.utils.toHex(expected), 64);
        await link.transfer(metamask, web3.utils.toWei("1", "ether"), {
          from: defaultAccount,
        });
        await link.approve(futurecc.address, web3.utils.toWei("1", "ether"), {
          from: metamask,
        });
        const tx = await futurecc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          follower,
          { from: metamask }
        );
        request = oracle.decodeRunRequest(tx.receipt.rawLogs[4]);
        await oc.fulfillOracleRequest(
          ...oracle.convertFufillParams(request, response, {
            from: oracleNode,
            gas: 500000,
          })
        );
      });

      it("throws an error if campaign is not started yet", async () => {
        try {
          await futurecc.claim(toAddressHash, r, s, v, follower, metamask, {
            from: metamask,
          });
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
        receipt = await distributor.createCampaign(
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
        const expected = web3.utils.soliditySha3(new BN(11));
        const response = web3.utils.padLeft(web3.utils.toHex(expected), 64);
        await link.transfer(metamask, web3.utils.toWei("1", "ether"), {
          from: defaultAccount,
        });
        await link.approve(pastcc.address, web3.utils.toWei("1", "ether"), {
          from: metamask,
        });
        const tx = await pastcc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          follower,
          { from: metamask }
        );
        request = oracle.decodeRunRequest(tx.receipt.rawLogs[4]);
        await oc.fulfillOracleRequest(
          ...oracle.convertFufillParams(request, response, {
            from: oracleNode,
            gas: 500000,
          })
        );
      });

      it("throws an error if campaign is finished", async () => {
        time.increase(time.duration.weeks(2));
        try {
          await pastcc.claim(toAddressHash, r, s, v, follower, metamask, {
            from: metamask,
          });
          assert.fail();
        } catch (error) {
          expect(error.reason).to.equal("Campaign is finished");
          assert(true);
        }
      });
    });

    describe("active campaign", () => {
      beforeEach(async () => {
        const expected = web3.utils.soliditySha3(new BN(11));
        const response = web3.utils.padLeft(web3.utils.toHex(expected), 64);
        await link.transfer(metamask, web3.utils.toWei("1", "ether"), {
          from: defaultAccount,
        });
        await link.approve(cc.address, web3.utils.toWei("1", "ether"), {
          from: metamask,
        });
        const tx = await cc.requestCheckingIsClaimable(
          oc.address,
          jobId,
          payment,
          follower,
          { from: metamask }
        );
        request = oracle.decodeRunRequest(tx.receipt.rawLogs[4]);
        await oc.fulfillOracleRequest(
          ...oracle.convertFufillParams(request, response, {
            from: oracleNode,
            gas: 500000,
          })
        );
      });

      it("throws an error if user is not claimable", async () => {
        const strangersig = await web3.eth.sign(toAddressHash, stranger);
        const sigbytes = web3.utils.hexToBytes(strangersig);
        const strangerr = web3.utils.bytesToHex(sigbytes.slice(0, 32));
        const strangers = web3.utils.bytesToHex(sigbytes.slice(32, 64));
        const strangerv = web3.utils.hexToNumber(
          web3.utils.bytesToHex(sigbytes.slice(-1))
        );
        expectRevert(
          cc.claim(
            toAddressHash,
            strangerr,
            strangers,
            strangerv,
            stranger,
            metamask,
            {
              from: metamask,
            }
          ),
          "Token is not claimable"
        );
      });

      it("throws an error if to address hash is not matched", async () => {
        try {
          await cc.claim(toAddressHash, r, s, v, follower, stranger, {
            from: metamask,
          });
          assert.fail();
        } catch (error) {
          expect(error.reason).to.equal(
            "toAddressHash and hash of to address are not matched"
          );
          assert(true);
        }
      });

      it("throws an error if ecrecover is failed", async () => {
        try {
          await cc.claim(toAddressHash, r, s, 3, follower, metamask, {
            from: metamask,
          });
          assert.fail();
        } catch (error) {
          expect(error.reason).to.equal("address is 0");
          assert(true);
        }
      });

      it("throws an error if from hash is not matched", async () => {
        try {
          await cc.claim(toAddressHash, r, s, v, stranger, metamask, {
            from: metamask,
          }),
            assert.fail();
        } catch (error) {
          expect(error.reason).to.equal("from address is not matched");
          assert(true);
        }
      });

      it("throws an error if user already claimed", async () => {
        await cc.claim(toAddressHash, r, s, v, follower, metamask, {
          from: metamask,
        });
        expectRevert(
          cc.claim(toAddressHash, r, s, v, follower, metamask, {
            from: metamask,
          }),
          "Token is not claimable"
        );
      });

      it("update claimed user to true", async () => {
        await cc.claim(toAddressHash, r, s, v, follower, metamask, {
          from: metamask,
        });
        const isClaimed = await cc.claimedUserList(follower);
        expect(isClaimed).to.equal(true);
      });

      it("update sent user to true", async () => {
        await cc.claim(toAddressHash, r, s, v, follower, metamask, {
          from: metamask,
        });
        const isSent = await cc.sentUserList(metamask);
        expect(isSent).to.equal(true);
      });

      it("transfer token to user with specific amount", async () => {
        const balanceBefore = await abctoken.balanceOf(metamask);
        assert.equal(balanceBefore.toString(), "0");
        await cc.claim(toAddressHash, r, s, v, follower, metamask, {
          from: metamask,
        });
        const balanceAfter = await abctoken.balanceOf(metamask);
        assert.equal(balanceAfter.toString(), "10");
      });

      it("emits event", async () => {
        const receipt = await cc.claim(
          toAddressHash,
          r,
          s,
          v,
          follower,
          metamask,
          {
            from: metamask,
          }
        );
        expectEvent(receipt, "Claim", { from: follower, to: metamask });
      });
    });
  });

  describe("#fulfill", () => {
    const expected = web3.utils.soliditySha3(new BN(11));
    const response = web3.utils.padLeft(web3.utils.toHex(expected), 64);
    let request;

    beforeEach(async () => {
      await link.transfer(metamask, web3.utils.toWei("1", "ether"), {
        from: defaultAccount,
      });
      await link.approve(cc.address, web3.utils.toWei("1", "ether"), {
        from: metamask,
      });
      const tx = await cc.requestCheckingIsClaimable(
        oc.address,
        jobId,
        payment,
        follower,
        { from: metamask }
      );
      request = oracle.decodeRunRequest(tx.receipt.rawLogs[4]);
      await oc.fulfillOracleRequest(
        ...oracle.convertFufillParams(request, response, {
          from: oracleNode,
          gas: 500000,
        })
      );
      const claimKey = await cc.generateClaimKey(1);
      assert.equal(expected, web3.utils.soliditySha3(claimKey));
    });

    it("set key hash list", async () => {
      const isClaimable = await cc.isClaimable(follower, metamask);
      assert.equal(isClaimable, true);
      const isNotClaimable = await cc.isClaimable(stranger, metamask);
      assert.equal(isNotClaimable, false);
    });

    context("when my contract does not recognize the request ID", () => {
      const otherId = web3.utils.toHex("otherId");

      beforeEach(async () => {
        request.id = otherId;
      });

      it("does not accept the data provided", async () => {
        await expectRevert.unspecified(
          oc.fulfillOracleRequest(
            ...oracle.convertFufillParams(request, response, {
              from: oracleNode,
            })
          )
        );
      });
    });

    context("when called by anyone other than the oracle contract", () => {
      it("does not accept the data provided", async () => {
        await expectRevert.unspecified(
          cc.fulfill(request.requestId, response, { from: stranger })
        );
      });
    });
  });

  describe("#cancelRequest", () => {
    let request;

    beforeEach(async () => {
      await link.transfer(metamask, web3.utils.toWei("1", "ether"), {
        from: defaultAccount,
      });
      await link.approve(cc.address, web3.utils.toWei("1", "ether"), {
        from: metamask,
      });
      const tx = await cc.requestCheckingIsClaimable(
        oc.address,
        jobId,
        payment,
        follower,
        { from: metamask }
      );
      request = oracle.decodeRunRequest(tx.receipt.rawLogs[4]);
    });

    context("before the expiration time", () => {
      it("cannot cancel a request", async () => {
        await expectRevert(
          cc.cancelRequest(
            request.requestId,
            request.payment,
            request.callbackFunc,
            request.expiration,
            { from: consumer }
          ),
          "Request is not expired"
        );
      });
    });

    context("after the expiration time", () => {
      beforeEach(async () => {
        await time.increase(300);
      });

      context("when called by a non-owner", () => {
        it("cannot cancel a request", async () => {
          await expectRevert.unspecified(
            cc.cancelRequest(
              request.requestId,
              request.payment,
              request.callbackFunc,
              request.expiration,
              { from: stranger }
            )
          );
        });
      });

      context("when called by an owner", () => {
        it("can cancel a request", async () => {
          await cc.cancelRequest(
            request.requestId,
            request.payment,
            request.callbackFunc,
            request.expiration,
            { from: consumer }
          );
        });
      });
    });
  });

  describe("#withdrawLink", () => {
    beforeEach(async () => {
      await link.transfer(cc.address, web3.utils.toWei("1", "ether"), {
        from: defaultAccount,
      });
    });

    context("when called by a non-owner", () => {
      it("cannot withdraw", async () => {
        await expectRevert.unspecified(cc.withdrawLink({ from: stranger }));
      });
    });

    context("when called by the owner", () => {
      it("transfers LINK to the owner", async () => {
        const beforeBalance = await link.balanceOf(consumer);
        assert.equal(beforeBalance, "0");
        await cc.withdrawLink({ from: consumer });
        const afterBalance = await link.balanceOf(consumer);
        assert.equal(afterBalance, web3.utils.toWei("1", "ether"));
      });
    });
  });
});
