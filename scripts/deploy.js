require('dotenv').config()
const { ethers, run, network } = require('hardhat')


const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    console.log('deploying contract...')
    const simpleStorage = await SimpleStorageFactory.deploy()
    const address = await simpleStorage.getAddress()

    console.log('contract address', address)

    //Verifying contract
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log("current value:", currentValue)

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    console.log("updated value:", updatedValue)
}

const verify = async (contractAddress, args) => {
    console.log('verifying contract...')

    try {
        await run('verify:verify', {
            contractAddress,
            args

        })
    } catch (error) {
        if (error.message.toLowerCase().includes('already verified')) {
            console.log('already verified!')
        } else {
            console.log(error)
        }
    }
}


main().then(() => process.exit(0)).catch((error) => {
    console.log(error)
    process.exit(1)
})