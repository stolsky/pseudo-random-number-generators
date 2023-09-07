import {
    describe,
    expect,
    it
} from 'vitest'

import xmur3 from '../src/hash/xmur3';
import { string_permutations } from './utilities';

describe("Test hash algorithm xmur3", () => {

    it("Result always a positive 32 bit number", () => {

        const seed = xmur3("ALoAA")
        let isNumber = false
        let isGreaterZero = false
        let isMax32Bit = false
        let currentNumber = null

        const MAX_SIZE = 2 ** 32
        const testSize = 500_000

        for (let i = 0; i < testSize; i = i + 1) {
            currentNumber = seed()
            isNumber = Number.isFinite(currentNumber)
            if (isNumber) {
                isGreaterZero = currentNumber > 0
                isMax32Bit = currentNumber < MAX_SIZE
                if (!isGreaterZero || !isMax32Bit) {
                    break
                }
            } else {
                break
            }
        }

        expect(isNumber).to.be.true
        expect(isGreaterZero).to.be.true
        expect(isMax32Bit).to.be.true
    })

    it("Very different hashes are always generated, even though the seeds are permutations of the same word.", () => {

        const phrase = "ALoAA"
        const seed = xmur3(phrase)

        const uniquePermutations = new Set<string>()
        string_permutations(phrase).forEach((permutation) => uniquePermutations.add(permutation))
        uniquePermutations.delete(phrase)

        let allPhrasesAreDifferent = true
        let allHashesDifferGreatly = true
        const hashDifference = 50_000_000;
        
        [...uniquePermutations].every((permutation) => {
            allPhrasesAreDifferent = phrase !== permutation
            if (!allPhrasesAreDifferent) {
                return false
            }
            const compareSeed = xmur3(permutation)
            if (Math.abs(seed() - compareSeed()) < hashDifference) {
                allHashesDifferGreatly = false
                return false
            }
            return true

        })

        expect(allPhrasesAreDifferent).to.be.true
        expect(allHashesDifferGreatly).to.be.true

    })

})