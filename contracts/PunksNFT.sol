// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PunksNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 public MAX_TOKENS = 4000;
  uint256 public CURRENT_PRICE = 15000000000000000; // 0.015 eth
  string public BASE_URI = "https://aicryptopunks.baicom.com/api/";
  address public constant DEV = 0x99872620911cBC41B66bc5D4123e21F09ABc0C44;

  event NewNFTMinted(address sender, uint256 tokenId);

  constructor() ERC721 ("AiCryptoPunks5", "PUNKS5") {
  }

  function makeNFT() public payable {
    uint256 newItemId = _tokenIds.current();

    require(CURRENT_PRICE <= msg.value, "Value sent is not correct");
    require(newItemId < MAX_TOKENS,"Max supply of NFT");

    _safeMint(msg.sender, newItemId);
    _tokenIds.increment();

    emit NewNFTMinted(msg.sender, newItemId);
  }

  function reserveNFT() public onlyOwner {
    for (uint i = 1; i <= 50; i++) {
      uint256 newItemId = _tokenIds.current();

      require(newItemId < MAX_TOKENS,"Max supply of NFT");

      _safeMint(msg.sender, newItemId);
      _tokenIds.increment();

      emit NewNFTMinted(msg.sender, newItemId);
    }
  }

  function totalSupply() view public returns (uint) {
    return _tokenIds.current();
  }

  function withdraw() public onlyOwner {
    uint balance = address(this).balance;
    payable(DEV).transfer(balance * 10 / 100);
    payable(msg.sender).transfer(address(this).balance);
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return BASE_URI;
  }

  function setBaseURI(string memory BaseURI) public onlyOwner {
    BASE_URI = BaseURI;
  }

  function setCurrentPrice(uint256 currentPrice) public onlyOwner {
    CURRENT_PRICE = currentPrice;
  }

  function contractURI() public view returns (string memory) {
    return BASE_URI;
  }
}
