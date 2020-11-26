/* eslint-disable @typescript-eslint/no-var-requires */
const { oracle } = require('@chainlink/test-helpers')
const { BN, expectRevert, time } = require('@openzeppelin/test-helpers')

contract('AudiusFollowersCampaign', accounts => {
  const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
  const { Oracle } = require('@chainlink/contracts/truffle/v0.6/Oracle')
  const Distributer = artifacts.require('AudiusFollowersDistributer.sol')
  const Campaign = artifacts.require('AudiusFollowersCampaign.sol')
  const FanToken = artifacts.require('FanToken.sol')

  const defaultAccount = accounts[0]
  const oracleNode = accounts[1]
  const stranger = accounts[2]
  const consumer = accounts[3]
  const follower = accounts[4]

  // These parameters are used to validate the data was received
  // on the deployed oracle contract. The Job ID only represents
  // the type of data, but will not work on a public testnet.
  // For the latest JobIDs, visit our docs here:
  // https://docs.chain.link/docs/testnet-oracles
  const jobId = web3.utils.toHex('4c7b7ffb66b344fbaa64995af81e355a')
  const url =
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,JPY'
  const path = 'USD'
  const times = 100

  // Represents 1 LINK for testnet requests
  const payment = web3.utils.toWei('1')

  let link, oc, cc, distributer, campaign, abctoken, xyztoken, now, future

  const campaignInfoCid = "campaign info cid"
  const recipientsCid = "recipients cid"
  const recipientsNum = 100

  beforeEach(async () => {
    link = await LinkToken.new({ from: defaultAccount })
    oc = await Oracle.new(link.address, { from: defaultAccount })
    distributer = await Distributer.new("Audius Test Distributer", link.address, {from: defaultAccount})
    abctoken = await FanToken.new(
        "ABCToken", "ABC", 1000000000, defaultAccount, 5, defaultAccount, 50, 5, {from: defaultAccount}
    )
    xyztoken = await FanToken.new(
        "XYZToken", "XYZ", 1000000000, defaultAccount, 5, defaultAccount, 50, 5, {from: defaultAccount}
    )
    await abctoken.transfer(consumer, 1000, { from: defaultAccount})
    await abctoken.approve(distributer.address, 1000, { from: consumer})
    now = await time.latest()
    future = now.add(time.duration.weeks(1))
    await abctoken.approve(distributer.address, 100, {from: defaultAccount})
    receipt = await distributer.createCampaign(
        abctoken.address, consumer, campaignInfoCid, recipientsCid, recipientsNum, now, future,
        {from: consumer}
    )
    campaignAddress = await distributer.campaignList(1)
    cc = await Campaign.at(campaignAddress)
    await oc.setFulfillmentPermission(oracleNode, true, {
      from: defaultAccount,
    })
  })

  describe('#requestCheckingIsClaimable', () => {
    context('without LINK', () => {
      it('reverts', async () => {
        await expectRevert.unspecified(
          cc.requestCheckingIsClaimable(
            oc.address, jobId, payment, follower.toString(),
            { from: follower }
          ),
        )
      })
    })

    context('with LINK', () => {
      let request

      beforeEach(async () => {
        await link.transfer(follower, web3.utils.toWei('1', 'ether'), {
          from: defaultAccount,
        })
        await link.approve(cc.address, web3.utils.toWei('1', 'ether'), {
          from: follower
        })
      })

      it("set new user id if its not registered yet", async () => {
        const nextUserIdBefore = await cc.nextUserId()
        assert.equal(nextUserIdBefore.toString(), "1")
        await cc.requestCheckingIsClaimable(
            oc.address, jobId, payment, follower.toString(),
            { from: follower }
        )
        const userId = await cc.userIdList(follower)
        assert.equal(userId.toString(), "1")
        const nextUserIdAfter = await cc.nextUserId()
        assert.equal(nextUserIdAfter, "2")
      })

      it("does not set new user id if its already registered", async () => {
        await cc.requestCheckingIsClaimable(
            oc.address, jobId, payment, follower.toString(),
            { from: follower }
        )
        const userId1 = await cc.userIdList(follower)
        assert.equal(userId1, "1")
        const nextUserId1 = await cc.nextUserId()
        assert.equal(nextUserId1, "2")

        await link.transfer(follower, web3.utils.toWei('1', 'ether'), {
          from: defaultAccount,
        })
        await link.approve(cc.address, web3.utils.toWei('1', 'ether'), {
          from: follower
        })
        await cc.requestCheckingIsClaimable(
            oc.address, jobId, payment, follower.toString(),
            { from: follower }
        )
        const userId2 = await cc.userIdList(follower)
        assert.equal(userId2, "1")
        const nextUserId2 = await cc.nextUserId()
        assert.equal(nextUserId2, "2")
      })

      context('sending a request to a specific oracle contract address', () => {
        it('triggers a log event in the new Oracle contract', async () => {
          const tx = await cc.requestCheckingIsClaimable(
              oc.address, jobId, payment, follower.toString(),
              { from: follower }
          )
          request = oracle.decodeRunRequest(tx.receipt.rawLogs[4])
          assert.equal(oc.address, tx.receipt.rawLogs[4].address)
          assert.equal(
            request.topic,
            web3.utils.keccak256(
              'OracleRequest(bytes32,address,bytes32,uint256,address,bytes4,uint256,uint256,bytes)',
            ),
          )
        })
      })
    })
  })

  describe("generateClaimKey", () => {
    it("returns claim key", async () => {
      expect((await cc.generateClaimKey(new BN("1"))).toString()).to.equal("11")
    })
  })

  describe('#fulfill', () => {
    const expected = web3.utils.soliditySha3(new BN(11))
    const response = web3.utils.padLeft(web3.utils.toHex(expected), 64)
    let request

    beforeEach(async () => {
      await link.transfer(follower, web3.utils.toWei('1', 'ether'), {
        from: defaultAccount,
      })
      await link.approve(cc.address, web3.utils.toWei('1', 'ether'), {
        from: follower
      })
      const tx = await cc.requestCheckingIsClaimable(
          oc.address, jobId, payment, follower.toString(),
          { from: follower }
      )
      request = oracle.decodeRunRequest(tx.receipt.rawLogs[4])
      await oc.fulfillOracleRequest(
        ...oracle.convertFufillParams(request, response, {
          from: oracleNode,
          gas: 500000,
        }),
      )
      const claimKey = await cc.generateClaimKey(1)
      assert.equal(expected, web3.utils.soliditySha3(claimKey))
    })

    it("set key hash list", async () => {
      const isClaimable = await cc.isClaimable(follower)
      assert.equal(isClaimable, true)
      const isNotClaimable = await cc.isClaimable(stranger)
      assert.equal(isNotClaimable, false)
    })

    context('when my contract does not recognize the request ID', () => {
      const otherId = web3.utils.toHex('otherId')

      beforeEach(async () => {
        request.id = otherId
      })

      it('does not accept the data provided', async () => {
        await expectRevert.unspecified(
          oc.fulfillOracleRequest(
            ...oracle.convertFufillParams(request, response, {
              from: oracleNode,
            }),
          ),
        )
      })
    })

    context('when called by anyone other than the oracle contract', () => {
      it('does not accept the data provided', async () => {
        await expectRevert.unspecified(
          cc.fulfill(request.requestId, response, { from: stranger }),
        )
      })
    })
  })

  describe('#cancelRequest', () => {
    let request

    beforeEach(async () => {
      await link.transfer(follower, web3.utils.toWei('1', 'ether'), {
        from: defaultAccount,
      })
      await link.approve(cc.address, web3.utils.toWei('1', 'ether'), {
        from: follower
      })
      const tx = await cc.requestCheckingIsClaimable(
          oc.address, jobId, payment, follower.toString(),
          { from: follower }
      )
      request = oracle.decodeRunRequest(tx.receipt.rawLogs[4])
    })

    context('before the expiration time', () => {
      it('cannot cancel a request', async () => {
        await expectRevert(
          cc.cancelRequest(
            request.requestId,
            request.payment,
            request.callbackFunc,
            request.expiration,
            { from: consumer },
          ),
          'Request is not expired',
        )
      })
    })

    context('after the expiration time', () => {
      beforeEach(async () => {
        await time.increase(300)
      })

      context('when called by a non-owner', () => {
        it('cannot cancel a request', async () => {
          await expectRevert.unspecified(
            cc.cancelRequest(
              request.requestId,
              request.payment,
              request.callbackFunc,
              request.expiration,
              { from: stranger },
            ),
          )
        })
      })

      context('when called by an owner', () => {
        it('can cancel a request', async () => {
          await cc.cancelRequest(
            request.requestId,
            request.payment,
            request.callbackFunc,
            request.expiration,
            { from: consumer },
          )
        })
      })
    })
  })

  describe('#withdrawLink', () => {
    beforeEach(async () => {
      await link.transfer(cc.address, web3.utils.toWei('1', 'ether'), {
        from: defaultAccount,
      })
    })

    context('when called by a non-owner', () => {
      it('cannot withdraw', async () => {
        await expectRevert.unspecified(cc.withdrawLink({ from: stranger }))
      })
    })

    context('when called by the owner', () => {
      it('transfers LINK to the owner', async () => {
        const beforeBalance = await link.balanceOf(consumer)
        assert.equal(beforeBalance, '0')
        await cc.withdrawLink({ from: consumer })
        const afterBalance = await link.balanceOf(consumer)
        assert.equal(afterBalance, web3.utils.toWei('1', 'ether'))
      })
    })
  })
})
