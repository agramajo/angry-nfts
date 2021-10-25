const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const nftContractFactory = await ethers.getContractFactory('PunksNFT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // make a nft
  // Call the function.
  let txn = await nftContract.makeNFT({value: ethers.utils.parseEther("0.015")})
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #1")

  // make a nft
  txn = await nftContract.makeNFT({value: ethers.utils.parseEther("0.015")})
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #2")

  // make reserveNFT 
  txn = await nftContract.reserveNFT()
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted reserve NFT")

  // show CURRENT_PRICE
  let price1 = await nftContract.CURRENT_PRICE()
  console.log("price:", ethers.utils.formatEther(price1))

  // change BASE_URI
  let nft1 = await nftContract.tokenURI(0)
  console.log("uri nft1:", nft1)

  txn = await nftContract.setBaseURI("https://test.com/api/")
  // Wait for it to be mined.
  await txn.wait()
  console.log("BaseURI changed")

  nft1 = await nftContract.tokenURI(0)
  console.log("new uri nft1:", nft1)

  // show total
  let all = await nftContract.totalSupply()
  console.log("total:", all.toNumber())
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
