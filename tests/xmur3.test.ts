/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
    describe,
    expect,
    it
} from "vitest"

import { string_permutations } from "./utilities"
import { xmur3 } from "../src/"

describe("Test hash algorithm xmur3", () => {
    it("Result always a positive 32 bit number", () => {
        const seed = xmur3("ALoAA")
        let is_number = false
        let is_greater_zero = false
        let is_max_32bit = false
        let current_number = null

        const MAX_SIZE = 2 ** 32
        const test_size = 500_000

        for (let i = 0; i < test_size; i = i + 1) {
            current_number = seed()
            is_number = Number.isFinite(current_number)
            if (is_number) {
                is_greater_zero = current_number > 0
                is_max_32bit = current_number < MAX_SIZE
                if (!is_greater_zero || !is_max_32bit) {
                    break
                }
            } else {
                break
            }
        }

        expect(is_number).to.be.true
        expect(is_greater_zero).to.be.true
        expect(is_max_32bit).to.be.true
    })

    it("Very different hashes are always generated, even though the seeds are permutations of the same word.", () => {
        const phrase = "ALoAA"
        const seed = xmur3(phrase)

        const unique_permutations = new Set<string>()
        string_permutations(phrase).forEach((permutation) => unique_permutations.add(permutation))
        unique_permutations.delete(phrase)

        let all_phrases_are_different = true
        let all_hashes_differ_greatly = true
        const hash_difference = 50_000_000;

        [...unique_permutations].every((permutation) => {
            all_phrases_are_different = phrase !== permutation
            if (!all_phrases_are_different) {
                return false
            }
            const compare_seed = xmur3(permutation)
            if (Math.abs(seed() - compare_seed()) < hash_difference) {
                all_hashes_differ_greatly = false
                return false
            }
            return true
        })

        expect(all_phrases_are_different).to.be.true
        expect(all_hashes_differ_greatly).to.be.true
    })
})
