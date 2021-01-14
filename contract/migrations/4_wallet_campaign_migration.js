const WalletDistributor = artifacts.require("WalletDistributor");

const distributorInfoCid = "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA";

module.exports = async (deployer) => {
  await deployer.deploy(WalletDistributor, distributorInfoCid);
};
