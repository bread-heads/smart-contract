const CryptoFrenchies = artifacts.require("./CryptoFrenchies.sol");

module.exports = async(deployer, network) => {
    // OpenSea proxy registry addresses for rinkeby and mainnet.
    let proxyRegistryAddress = "";
    if (network === 'polygon') {
        proxyRegistryAddress = "0x58807baD0B376efc12F5AD86aAc70E78ed67deaE";
    } else if (network === 'mumbai') {
        proxyRegistryAddress = "0x58807baD0B376efc12F5AD86aAc70E78ed67deaE";
    } else {
        proxyRegistryAddress = "0x0000000000000000000000000000000000000000";
    }

    const contractName = process.env.NAME;
    const contractTicker = process.env.TICKER;
    const contractDescription = process.env.DESCRIPTION;
    const baseURI = process.env.BASEURI;
    const gasPrice = process.env.GAS_PRICE;

    await deployer.deploy(CryptoFrenchies, proxyRegistryAddress, contractName, contractTicker, contractDescription, baseURI, { gas: 5000000, gasPrice: gasPrice });
    const contract = await CryptoFrenchies.deployed();
    console.log('CONTRACT ADDRESS IS*||*' + contract.address + '*||*')
};