const web3 = require("web3")
const AudiusFollowersDistributer = artifacts.require("AudiusFollowersDistributer")
const {LinkToken} = require('@chainlink/contracts/truffle/v0.4/LinkToken')
const {Oracle} = require('@chainlink/contracts/truffle/v0.6/Oracle')

const distributerInfoCid = ""

module.exports = async (deployer, network, [defaultAccount]) => {
  // Local (development) networks need their own deployment of the LINK
  // token and the Oracle contract
  if (!network.startsWith('live')) {
    LinkToken.setProvider(deployer.provider)
    Oracle.setProvider(deployer.provider)
    try {
      await deployer.deploy(LinkToken, { from: defaultAccount })
      await deployer.deploy(Oracle, LinkToken.address, { from: defaultAccount })
      await deployer.deploy(AudiusFollowersDistributer, distributerInfoCid, LinkToken.address)
    } catch (err) {
      console.error(err)
    }
  } else {
    // For live networks, use the 0 address to allow the ChainlinkRegistry
    // contract automatically retrieve the correct address for you
    await deployer.deploy(AudiusFollowersDistributer, distributerInfoCid, '0x0000000000000000000000000000000000000000')
  }
}

