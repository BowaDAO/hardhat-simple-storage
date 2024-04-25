require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");
require("./tasks/block-number")

const { vars } = require("hardhat/config");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const RPC_URL = vars.get("RPC_URL");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: 'hardhat',
  networks: {
    sepolia: { url: `https://eth-sepolia.g.alchemy.com/v2/${RPC_URL}`, accounts: [PRIVATE_KEY], chainId: 11155111 },
    localhost: { url: 'http://127.0.0.1:8545/', chainId: 31337 } //hardhat added accounts for local
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    },

  },
  gasReporter: {
    enabled: true
  }
};
