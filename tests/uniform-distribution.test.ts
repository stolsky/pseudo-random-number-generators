import {
    describe,
    expect,
    it
} from 'vitest'

import xmur3 from '../src/hash/xmur3';
import xoshiro128ss from '../src/prng/xoshiro128ss';
import sfc32 from '../src/prng/sfc32';

describe("Test pseudorandom number generator for its uniform distribution", () => {

    const test_size = 500_000

    it("Results of xoshiro128ss are on average between 0.4995 and 0.5005", () => {

        const seed = xmur3("ALoAA")
        const prng = xoshiro128ss(seed(), seed(), seed(), seed())
        
        let sum = 0
        for (let i = 0; i < test_size; i = i + 1) {
            const rnd = prng()
            sum = sum + rnd
        }

        sum = sum / test_size
        expect(sum).to.be.within(0.4995, 0.5005)

    });

    it("Results of sfc32 are on average between 0.4995 and 0.5005", () => {

        const seed = xmur3("ALoAA")
        const prng = sfc32(seed(), seed(), seed(), seed())

        let sum = 0
        for (let i = 0; i < test_size; i = i + 1) {
            const rnd = prng()
            sum = sum + rnd
        }

        sum = sum / test_size
        expect(sum).to.be.within(0.4995, 0.5005)
    })

})