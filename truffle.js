const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config()

module.exports = {
  contracts_directory: "./contracts/",
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_KEY
  },
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      gas: 5000000,
      gasPrice: process.env.GAS_PRICE,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER),
      network_id: 4,
      confirmations: 2,
      gasPrice: process.env.GAS_PRICE,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    ethereum: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      gas: 3000000,
      gasPrice: process.env.GAS_PRICE,
      skipDryRun: true
    }
  },
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 2,
    },
  },
  compilers: {
    solc: {
      version: "0.8.6"
    },
  },
};
