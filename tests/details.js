const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
require('dotenv').config()
const NFT_CONTRACT_ABI = require('../abi.json')
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const axios = require('axios')

async function main() {
    try {
        const configs = JSON.parse(fs.readFileSync('./configs/' + argv._ + '.json').toString())
        const provider = new HDWalletProvider(
            configs.owner_mnemonic,
            configs.provider
        );
        const web3Instance = new web3(provider);
        const nftContract = new web3Instance.eth.Contract(
            NFT_CONTRACT_ABI,
            configs.contract_address, { gasLimit: "10000000" }
        );

        let ended = false
        let i = 1;
        try {
            while (!ended) {
                const owner = await nftContract.methods.ownerOf(i).call();
                const uri = await nftContract.methods.tokenURI(i).call();
                console.log('TOKENID: ' + i + ' - ' + uri, 'OWNER IS', owner)
                console.log('ASKING METADATA...')
                const details = await axios.get(uri)
                console.log('TITLE IS: ' + details.data.name)
                if(details.data.name.indexOf('#' + i.toString().padStart(3, "0")) === -1){
                    console.log("!!!!!! ALERT !!!!!!! WRONG METADATA AT ID " + i)
                }
                if(details.data.attributes === undefined){
                    console.log("!!!!!! ALERT !!!!!!! TRAITS NOT FOUND")
                }
                i++
            }
        } catch (e) {
            ended = true
            console.log(e)
        }
    } catch (e) {
        console.log(e.message)
        process.exit();
    }
}

if (argv._ !== undefined) {
    main();
} else {
    console.log('Provide a deployed contract first.')
}