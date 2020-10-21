/* eslint-disable @typescript-eslint/no-var-requires */
const { oracle } = require('@chainlink/test-helpers')
const { expectRevert, time } = require('@openzeppelin/test-helpers')

// TODO currently work with `truffle test`. Update for mocha
contract('Audius', accounts => {
  const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
  const { Oracle } = require('@chainlink/contracts/truffle/v0.6/Oracle')
  const Audius = artifacts.require('Audius.sol')

  const defaultAccount = accounts[0]
  const oracleNode = accounts[1]
  const stranger = accounts[2]
  const consumer = accounts[3]
  const factory = accounts[4]
  const user = accounts[5]

  // These parameters are used to validate the data was received
  // on the deployed oracle contract. The Job ID only represents
  // the type of data, but will not work on a public testnet.
  // For the latest JobIDs, visit our docs here:
  // https://docs.chain.link/docs/testnet-oracles
  const jobId = web3.utils.toHex('4c7b7ffb66b344fbaa64995af81e355a')

  // Represents 1 LINK for testnet requests
  const payment = web3.utils.toWei('1')

  let link, oc, cc

  beforeEach(async () => {
    link = await LinkToken.new({ from: defaultAccount })
    oc = await Oracle.new(link.address, { from: defaultAccount })
    cc = await Audius.new(factory, link.address, { from: consumer })
    await oc.setFulfillmentPermission(oracleNode, true, {
      from: defaultAccount,
    })
  })

  describe('#createRequest', () => {
    context('without LINK', () => {
      it('reverts', async () => {
        await expectRevert.unspecified(
          cc.requestCheckingAddress(oc.address, jobId, "dummy", "cid", "address",
            new web3.utils.BN("1000000000000000000"),
            { from: consumer, }
          ),
        )
      })
    })

    context('with LINK', () => {
      let request

      beforeEach(async () => {
        await link.transfer(cc.address, web3.utils.toWei('1', 'ether'), {
          from: defaultAccount,
        })
      })

      context('sending a request to a specific oracle contract address', () => {
        it('triggers a log event in the new Oracle contract', async () => {
          const tx = await cc.requestCheckingAddress(oc.address, jobId, "dummy", "cid", "address",
            new web3.utils.BN("1000000000000000000"),
            { from: consumer },
          )
          request = oracle.decodeRunRequest(tx.receipt.rawLogs[3])
          assert.equal(oc.address, tx.receipt.rawLogs[3].address)
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

  describe('#fulfill', () => {
    const userId = 1
    const tokenId = 1
    const response = `${userId}-${tokenId}-true`
    let request

    beforeEach(async () => {
      await link.transfer(cc.address, web3.utils.toWei('1', 'ether'), {
        from: defaultAccount,
      })
      const tx = await cc.requestCheckingAddress(oc.address, jobId, "dummy", "cid", "address",
          new web3.utils.BN("1000000000000000000"),
          { from: consumer },
      )
      request = oracle.decodeRunRequest(tx.receipt.rawLogs[3])
      await oc.fulfillOracleRequest(
        ...oracle.convertFufillParams(request, response, {
          from: oracleNode,
          gas: 500000,
        }),
      )
    })

    it('records the data given to it by the oracle', async () => {
      const data = await cc.data()
      assert.equal(
        data,
        "1-1-true"
      )
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
        const [, , , , , responseBytes] = oracle.convertFufillParams(request, response, {
          from: oracleNode,
        })
        await expectRevert.unspecified(
          cc.fulfill(request.requestId, responseBytes, { from: stranger }),
        )
      })
    })
  })

  describe('#cancelRequest', () => {
    let request

    beforeEach(async () => {
      await link.transfer(cc.address, web3.utils.toWei('1', 'ether'), {
        from: defaultAccount,
      })
      const tx = await cc.requestCheckingAddress(oc.address, jobId, "dummy", "cid", "address",
          new web3.utils.BN("1000000000000000000"),
          { from: consumer },
      )
      request = oracle.decodeRunRequest(tx.receipt.rawLogs[3])
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
        // TODO Fix failed
        xit('can cancel a request', async () => {
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
