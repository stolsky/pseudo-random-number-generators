import {
    describe,
    expect,
    it
} from 'vitest'

import random, { gauss, set_seed } from '../src/random';
import xmur3 from '../src/hash/xmur3';
import xoshiro128ss from '../src/prng/xoshiro128ss';

describe("Test random.ts interface", () => {

    it("\"random()\" and its internal used \"xoshiro128ss()\" produce the same results.", () => {

        const phrase = "ALoAA"
        const seed = xmur3(phrase)
        const xoshiro = xoshiro128ss(seed(), seed(), seed(), seed())
        set_seed(phrase)

        let is_same_result = true
        const test_size = 500_000
        for (let i = 0; i < test_size; i = i + 1) {
            const rand1 = xoshiro()
            const rand2 = random()
            if (rand1 !== rand2) {
                is_same_result = false
                break
            }
        }

        expect(is_same_result).to.be.true
    })

    it("\"gauss()\" generates a normal distribution (mean = 0, standard deviation = 1)", () => {

        const phrase = "ALoAA";
        set_seed(phrase);

        const test_size = 500_000
        let sum = 0
        for (let i = 0; i < test_size; i = i + 1) {
            const rnd = gauss()
            sum = sum + Math.abs(rnd)
        }

        const avg = sum / test_size
        expect(avg).to.be.above(0.79)

    })

})

describe("Test of the generation of numbers inside a given interval", () => {

    it("Test the interval [100, 1000]", () => {

        const phrase = "ALoAA"
        set_seed(phrase)

        const start_interval = 100
        const end_interval = 1000

        let count_outside_numbers = 0
        const test_size = 500_000
        for (let i = 0; i < test_size; i = i + 1) {
            const rnd = random(start_interval, end_interval)
            if (rnd < start_interval || rnd > end_interval) {
                count_outside_numbers = count_outside_numbers + 1
            }
        }

        expect(count_outside_numbers).to.equal(0)
    })

})

describe("Test default seed initialization", () => {

    it("By default, the seed is different every time, so the numbers should be different", () => {
        const numbers: number[] = [];
        let count_doubles = 0;
        const test_size = 100_000;
        for (let i = 0; i < test_size; i = i + 1) {
            // resets the prng with defal seed
            set_seed();
            const rnd = random();
            if (numbers.includes(rnd)) {
                count_doubles = count_doubles + 1;
                numbers.push(rnd);
            }
        }
        expect(count_doubles).to.equal(0)
        //console.log(countDoubles)
    })

})

describe("The same seed produces the same numbers", () => {
    it("", () => {
        const test_size = 500_000

        // first set of random numbers
        const numbers1 = []
        set_seed("ALoAA")
        for (let i = 0; i < test_size; i = i + 1) {
            numbers1.push(random())
        }

        // second set of random numbers
        const numbers2 = []
        set_seed("ALoAA")
        for (let i = 0; i < test_size; i = i + 1) {
            numbers2.push(random())
        }

        // compare first set with second set of random numbers
        let same = true
        for (let i = 0; i < test_size; i = i + 1) {
            if (numbers1[`${i}`] !== numbers2[`${i}`]) {
                same = false
                break
            }
        }
        expect(same).to.be.true
    })
})
