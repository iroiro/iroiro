async function main() {
  const [deployer] = await ethers.getSigners();

  const WalletDistributor = await ethers.getContractFactory(
    "WalletDistributor"
  );
  const walletDist = await WalletDistributor.deploy("WalletDistributor");

  console.log("WalletDistributor deployed to:", walletDist.address);

  const UUIDDistributor = await ethers.getContractFactory("UUIDDistributor");
  const uuidDist = await UUIDDistributor.deploy("");

  console.log("UUIDDistributor deployed to:", uuidDist.address);

  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
  const token = await ERC20Mock.deploy(
    "Token",
    "TKN",
    deployer.address,
    10000000000
  );

  console.log("ERC20Mock deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
