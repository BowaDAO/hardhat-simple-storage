const { ethers } = require('hardhat')
const { assert, expect } = require('chai')

describe('SimpleStorage', () => {

    let simpleStorageFactory, simpleStorage

    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = '0'
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we can store", async () => {
        expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)


    })
})