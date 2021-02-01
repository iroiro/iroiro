const UUIDDistributor = artifacts.require("UUIDDistributor");

const distributorInfoCid = "QmRBHkjbuLExQPia1wiLgwjqXaBXowPDVVPPoTJv9wJnYP";

module.exports = async (deployer) => {
  await deployer.deploy(UUIDDistributor, distributorInfoCid);
};
