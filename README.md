# ERC-721 Starter for Polygon

This is a fully working example of ERC721 for Polygon or any EVM-based blockchain.

The contract is based on OpenZeppelin v4 with a couple of useful functions to fetch the tokenIds and prevent double minting.

It's supposed to work with IPFS, but you can change the file system using a centralized solution (not suggested). 
If you don't know what IPFS is start from here: https://ipfs.io/

## Setting up the environment

To start develop your own ERC-721 you will need a couple of tools:
- NodeJS: https://nodejs.org/en/
- Ganache (which is used to create a local blockchain): https://www.trufflesuite.com/ganache
- IPFS: to create the NFTs and uploading it to the distributed file system

So we can install the dependencies:
```
yarn
```

Now you have to create a configuration file, you can find a template here: `configs/ganache.json`.
This file is used to deploy the contract and test it, we suggest to create different configs for different enviorments.

Let's comment what's inside:
- `network`: You can use `ganache`, `mumbai` or `polygon`
- `contract_address`: It's the final contract address, it will be auto-compiled during the deploy
- `owner_address`: The owner of the contract
- `owner_mnemonic`: The mnemonic phrase of the owner
- `public`: Set it to `true` if you want to allow anyone mint the nfts or `false` if not. Only the owner will be able to mint new nfts.
- `contract`: This is an object containing the informations of the contract:
    - `name`: The name of the contract, this will be visible on OpenSea
    - `ticker`: The ticker of the token, this will be visible just on PolygonScan
    - `description`: An IPFS object with all the description, this is required by OpenSea and you will be able to change the informations even later and you can find an example here: https://ipfs.io/ipfs/bafkreibqsvjbkkqkrn53htg2dpm5msld3xdqt4p6gsqkmfwvawtgawz6te
- `provider`: You node provider, we suggest Figment DataHub (https://datahub.figment.io/)
- `baseURI`: The URI from where the token will be fetched, can be IPFS or your API server

## Deploy the contract

Now we're ready to deploy our first contract, we'll use the command line like this:
```
yarn deploy ganache
```

If you want to see what's going on the background you can use:

```
yarn deploy:debug ganache
```

Please pay attention, the address will not be recovered automatically in debug mode!

## Test the contract

If everything was ok you will find the updated contract address inside `config/ganache.json` and you will even see the `abi.json` file, which is automatically extracted.
We can now test the contract using different scripts, they're all under `tests` folder:

- `yarn test:details ganache`: This script will check the owner and all the minted tokens
- `yarn test:mint ganache`: This script will mint a new token

## Migrating from ganache to a network

You can now create a new config file, inserting your real data and deploy the contract to Mumbai or Polygon.
After you've minted a correct file using IPFS you will be able to list your contract directly on OpenSea from there: https://opensea.io/get-listed