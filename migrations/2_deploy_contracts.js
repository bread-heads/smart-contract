const BreadHeads = artifacts.require("./BreadHeads.sol");

module.exports = async (deployer, network) => {
    // OpenSea proxy registry addresses for rinkeby and mainnet.
    let proxyRegistryAddress = "";
    if (network === 'rinkeby') {
        proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
    } else if (network === 'ethereum') {
        proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
    } else {
        proxyRegistryAddress = "0x0000000000000000000000000000000000000000";
    }
    
    console.log('Network is:', network)

    const contractName = process.env.NAME;
    const contractTicker = process.env.TICKER;
    const contractDescription = process.env.DESCRIPTION;
    const baseURI = process.env.BASEURI;
    const gasPrice = process.env.GAS_PRICE;
    const realOwnerAddress = process.env.REAL_OWNER;

    await deployer.deploy(BreadHeads, proxyRegistryAddress, contractName, contractTicker, contractDescription, baseURI, { gas: 5000000, gasPrice: gasPrice });
    const contract = await BreadHeads.deployed();
    // await contract.transferOwnership(realOwnerAddress)
};