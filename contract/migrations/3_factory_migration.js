const Vesting = artifacts.require("Vesting")
const StakingPool = artifacts.require("StakingPool")
const TokenFactory = artifacts.require("TokenFactory")

module.exports = async (deployer, network, [defaultAccount]) => {
  let vesting, staking
  deployer.deploy(Vesting).then(instance => {
    vesting = instance
    return deployer.deploy(StakingPool)
  }).then(instance => {
    staking = instance
    return deployer.deploy(TokenFactory, vesting.address, staking.address)
  }).then(instance => {
    const tokenFactory = instance
    vesting.transferOwnership(tokenFactory.address)
    staking.transferOwnership(tokenFactory.address)
  })
}
