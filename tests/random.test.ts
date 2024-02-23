import {
    describe,
    expect,
    it
} from "vitest"

import {
    gauss,
    mulberry32,
    random,
    setup_prng,
    sfc32,
    splitmix32,
    xmur3,
    xoshiro128ss
} from "../lib"
import { generate_numbers_from_algorithm } from "./utilities"

describe("Test default behaviour", () => {
    it("Without setup random should return alsways 0", () => {
        let all_zeros = true
        for (let i = 0; i < TEST_SIZE; i = i + 1) {
            if (random() !== 0) {
                all_zeros = false
                break
            }
        }
        expect(all_zeros).to.be.equal(true)
    })
})

const TEST_SIZE = 100_000
const seed = xmur3("uNiTtEsT")

describe("Test PRNG algorithms", () => {
    it("xoshiro128ss", () => {
        const numbers = generate_numbers_from_algorithm(
            xoshiro128ss(seed(), seed(), seed(), seed()),
            TEST_SIZE
        )
        expect(numbers.size).to.be.above(TEST_SIZE - 100)
    })

    it("sfc32", () => {
        const numbers = generate_numbers_from_algorithm(
            sfc32(seed(), seed(), seed(), seed()),
            TEST_SIZE
        )
        expect(numbers.size).to.be.above(TEST_SIZE - 100)
    })

    it("splitmix32", () => {
        const numbers = generate_numbers_from_algorithm(
            splitmix32(seed()),
            TEST_SIZE
        )
        expect(numbers.size).to.be.above(TEST_SIZE - 100)
    })

    it("mulberry32", () => {
        const numbers = generate_numbers_from_algorithm(
            mulberry32(seed()),
            TEST_SIZE
        )
        expect(numbers.size).to.be.above(TEST_SIZE - 100)
    })

    it("random initalized with xoshiro128ss produces the same results", () => {
        const seeds = [seed(), seed(), seed(), seed()]
        const xoshiro = xoshiro128ss(seeds[0], seeds[1], seeds[2], seeds[3])
        setup_prng(xoshiro128ss(seeds[0], seeds[1], seeds[2], seeds[3]))

        let same = true
        for (let i = 0; i < TEST_SIZE; i = i + 1) {
            const num_xoshiro = xoshiro()
            const num_random = random()
            if (num_xoshiro !== num_random) {
                console.log(num_xoshiro, num_random)
                same = false
                break
            }
        }
        expect(same).to.be.equal(true)
    })

    it("gauss() generates a normal distribution (mean = 0, standard deviation = 1)", () => {
        setup_prng(xoshiro128ss(seed(), seed(), seed(), seed()))

        let sum = 0
        for (let i = 0; i < TEST_SIZE; i = i + 1) {
            const rnd = gauss()
            sum = sum + Math.abs(rnd)
        }

        const avg = sum / TEST_SIZE
        expect(avg).to.be.above(0.79)
    })
})

describe("Test correct behaviour of random()", () => {
    it("Test wrong interval: from > to, falls back to default interval [0, 1]", () => {
        setup_prng(mulberry32(seed()))
        const lower_bound = 7
        const upper_bound = 3

        let always_inside_default_interval = true
        for (let i = 0; i < TEST_SIZE; i = i + 1) {
            const result = random(lower_bound, upper_bound)
            if (result < 0 || result > 1) {
                always_inside_default_interval = false
                break
            }
        }
        expect(always_inside_default_interval).to.be.equal(true)
    })

    it("The same seed produces the same numbers", () => {
        // first set of random numbers
        const numbers1 = []
        const seed1 = xmur3("uNiTtEsT")
        setup_prng(mulberry32(seed1()))
        for (let i = 0; i < TEST_SIZE; i = i + 1) {
            numbers1.push(random())
        }

        // second set of random numbers
        const numbers2 = []
        const seed2 = xmur3("uNiTtEsT")
        setup_prng(mulberry32(seed2()))
        for (let i = 0; i < TEST_SIZE; i = i + 1) {
            numbers2.push(random())
        }

        // compare first set with second set of random numbers
        let same = true
        for (let i = 0; i < TEST_SIZE; i = i + 1) {
            if (numbers1[i] !== numbers2[i]) {
                same = false
                break
            }
        }

        expect(same).to.be.equal(true)
    })

    it("The numbers should stay inside the interval", () => {
        setup_prng(xoshiro128ss(seed(), seed(), seed(), seed()))

        const start_interval = 100
        const end_interval = 1000

        let count_outside_numbers = 0
        for (let i = 0; i < TEST_SIZE; i = i + 1) {
            const rnd = random(start_interval, end_interval)
            if (rnd < start_interval || rnd > end_interval) {
                count_outside_numbers = count_outside_numbers + 1
            }
        }

        expect(count_outside_numbers).to.be.equal(0)
    })
})
