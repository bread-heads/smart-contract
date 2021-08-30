// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CryptoFrenchies
 * CryptoFrenchies - Base smart contract for ERC721 on Polygon
 */
contract CryptoFrenchies is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {

    mapping (string => address) private _creatorsMapping;
    mapping (uint256 => string) private _tokenIdsMapping;
    mapping (string => uint256) private _tokenIdsToHashMapping;
    address openseaProxyAddress;
    string public contract_ipfs_json;
    string private baseURI;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint256 MAX_NFTS = 3;
    string public notrevealed_nft = "00000000000000000000000000000000000";
    constructor (
        address _openseaProxyAddress,
        string memory _name,
        string memory _ticker,
        string memory _contract_ipfs,
        string memory _base_uri
    ) ERC721(_name, _ticker) {
        openseaProxyAddress = _openseaProxyAddress;
        contract_ipfs_json = _contract_ipfs;
        baseURI = _base_uri;
    }

    function _baseURI() internal override view returns (string memory) {
        return baseURI;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function contractURI() public view returns (string memory) {
        return contract_ipfs_json;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function nftExists(string memory tokenHash) internal view returns (bool) {
        address owner = _creatorsMapping[tokenHash];
        return owner != address(0);
    }

    function returnTokenIdByHash(string memory tokenHash) public view returns (uint256) {
        return _tokenIdsToHashMapping[tokenHash];
    }

    function returnTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenIdsMapping[tokenId];
    }

    function returnCreatorByNftHash(string memory hash) public view returns (address) {
        return _creatorsMapping[hash];
    }

    /*
        This method will first mint the token to the address.
    */
    function mintNFT() public onlyOwner returns (uint256) {
        require(_tokenIdCounter.current() < MAX_NFTS, "CryptoFrenchies: Hard cap reached.");
        uint256 tokenId = mintTo(msg.sender, notrevealed_nft);
        _tokenIdsMapping[tokenId] = notrevealed_nft;
        return tokenId;
    }

    /*
        Private method that mints the token
    */
    function mintTo(address _to, string memory _tokenURI) private returns (uint256){
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(_to, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        return newTokenId;
    }

    /*
        This method will reveal the NFT
    */
    function revealNFT(string memory _tokenURI, uint256 tokenId) public onlyOwner returns (bool) {
        require(
            keccak256(abi.encode(_tokenIdsMapping[tokenId])) == keccak256(abi.encode(notrevealed_nft)),
            "CryptoFrenchies: this nft was revealed yet."
        );
        require(
            !nftExists(_tokenURI),
            "CryptoFrenchies: Trying to mint existent nft"
        );
        _setTokenURI(tokenId, _tokenURI);
        _creatorsMapping[_tokenURI] = msg.sender;
        _tokenIdsMapping[tokenId] = _tokenURI;
        _tokenIdsToHashMapping[_tokenURI] = tokenId;
        return true;
    }

    /*
        This method is used by OpenSea to automate the sell.
    */
    function isApprovedForAll(
        address _owner,
        address _operator
    ) public view override returns (bool isOperator) {
        if (_operator == address(openseaProxyAddress)) {
            return true;
        }
        
        return super.isApprovedForAll(_owner, _operator);
    }
}
