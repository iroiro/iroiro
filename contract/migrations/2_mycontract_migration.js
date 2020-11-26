const web3 = require("web3");
const Audius = artifacts.require("Audius");
const Vesting = artifacts.require("Vesting");
const StakingPool = artifacts.require("StakingPool");
const TokenFactory = artifacts.require("TokenFactory");
const { LinkToken } = require("@chainlink/contracts/truffle/v0.4/LinkToken");
const { Oracle } = require("@chainlink/contracts/truffle/v0.6/Oracle");

// TODO: Deprecated contracts migration, will be removed
module.exports = async (deployer, network, [defaultAccount]) => {
  let vesting, staking;
  await deployer
    .deploy(Vesting)
    .then((instance) => {
      vesting = instance;
      return deployer.deploy(StakingPool);
    })
    .then((instance) => {
      staking = instance;
      return deployer.deploy(TokenFactory, vesting.address, staking.address);
    })
    .then((instance) => {
      const tokenFactory = instance;
      vesting.transferOwnership(tokenFactory.address);
      staking.transferOwnership(tokenFactory.address);
      return tokenFactory;
    })
    .then(async (factory) => {
      if (network.startsWith("rinkeby")) {
        Oracle.setProvider(deployer.provider);
        try {
          await deployer.deploy(
            Oracle,
            "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
            { from: defaultAccount }
          );
          await deployer.deploy(
            Audius,
            factory.address,
            "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
          );
        } catch (err) {
          console.error(err);
        }
      } else if (network.startsWith("kovan")) {
        Oracle.setProvider(deployer.provider);
        try {
          await deployer.deploy(
            Oracle,
            "0xa36085F69e2889c224210F603D836748e7dC0088",
            { from: defaultAccount }
          );
          await deployer.deploy(
            Audius,
            factory.address,
            "0xa36085F69e2889c224210F603D836748e7dC0088"
          );
        } catch (err) {
          console.error(err);
        }
        // Local (development) networks need their own deployment of the LINK
        // token and the Oracle contract
      } else if (!network.startsWith("live")) {
        LinkToken.setProvider(deployer.provider);
        Oracle.setProvider(deployer.provider);
        try {
          let linkToken;
          await deployer
            .deploy(LinkToken, { from: defaultAccount })
            .then((instance) => {
              linkToken = instance;
              return deployer.deploy(
                Audius,
                factory.address,
                LinkToken.address
              );
            })
            .then((audius) => {
              const BN = web3.utils.BN;
              // Send 100 $LINK
              linkToken.transfer(
                audius.address,
                new BN("100000000000000000000"),
                { from: defaultAccount }
              );
              return deployer.deploy(Oracle, LinkToken.address, {
                from: defaultAccount,
              });
            })
            .then((oracle) => {
              oracle.setFulfillmentPermission(linkToken.address, true, {
                from: defaultAccount,
              });
            });
        } catch (err) {
          console.error(err);
        }
      } else {
        // For live networks, use the 0 address to allow the ChainlinkRegistry
        // contract automatically retrieve the correct address for you
        deployer.deploy(
          Audius,
          factory.address,
          "0x0000000000000000000000000000000000000000"
        );
      }
    });
};
