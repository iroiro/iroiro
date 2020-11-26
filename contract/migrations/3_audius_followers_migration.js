const web3 = require("web3");
const AudiusFollowersDistributer = artifacts.require(
  "AudiusFollowersDistributer"
);
const { LinkToken } = require("@chainlink/contracts/truffle/v0.4/LinkToken");
const { Oracle } = require("@chainlink/contracts/truffle/v0.6/Oracle");

// TODO: Set info cid
const distributerInfoCids = {
  kovan: "",
  cldev: "",
  live: "",
};

module.exports = async (deployer, network, [defaultAccount]) => {
  if (network.startsWith("rinkeby")) {
    Oracle.setProvider(deployer.provider);
    try {
      await deployer.deploy(
        Oracle,
        "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
        { from: defaultAccount }
      );
      await deployer.deploy(
        AudiusFollowersDistributer,
        distributerInfoCids["kovan"],
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
        AudiusFollowersDistributer,
        distributerInfoCids["kovan"],
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
      await deployer.deploy(LinkToken, { from: defaultAccount });
      await deployer.deploy(Oracle, LinkToken.address, {
        from: defaultAccount,
      });
      await deployer.deploy(
        AudiusFollowersDistributer,
        distributerInfoCids[network],
        LinkToken.address
      );
    } catch (err) {
      console.error(err);
    }
  } else {
    // For live networks, use the 0 address to allow the ChainlinkRegistry
    // contract automatically retrieve the correct address for you
    await deployer.deploy(
      AudiusFollowersDistributer,
      distributerInfoCids["live"],
      "0x0000000000000000000000000000000000000000"
    );
  }
};
