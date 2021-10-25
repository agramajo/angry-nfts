const main = async () => {
  const CONTRACT = "0xF5656BC78042464Ef1CF5040aA3Ae8ac7d670f90"

  const nftContractFactory = await ethers.getContractFactory('PunksNFT');
  const nftContract = await nftContractFactory.attach(CONTRACT);

  // make a nft
  // Call the function.
  let txn = await nftContract.makeNFT({value: ethers.utils.parseEther("0.015")})
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #1", txn)

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
