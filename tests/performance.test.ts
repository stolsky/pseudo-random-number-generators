import {
    describe,
    expect,
    it
} from 'vitest'

import xmur3 from '../src/hash/xmur3'
import xoshiro128ss from '../src/prng/xoshiro128ss'
import mulberry32 from '../src/prng/mulberry32'
import sfc32 from '../src/prng/sfc32'
import splitmix32 from '../src/prng/splitmix32'

type Result = {
    name: string,
    deltaTime: number,
    diversity: number
}

const test = (method: () => number, name: string, size: number): Result => {
    const diversity = new Set<number>()
    const timestamp = performance.now()
    for (let i = 0; i < size; i = i + 1) {
        diversity.add(method())
    }
    return {
        name,
        deltaTime: performance.now() - timestamp,
        diversity: diversity.size
    }
}

describe("Compare performance of mulberry32, sfc32 and xoshiro128ss", () => {

    it("Test diversity and speed", () => {
        
        const seed = xmur3("apples")
        const generators = [
            { name: "Mulberry32", rnd: mulberry32(seed()) },
            { name: "SFC32", rnd: sfc32(seed(), seed(), seed(), seed()) },
            { name: "SplitMix32", rnd: splitmix32(seed()) },
            { name: "Xoshiro128ss", rnd: xoshiro128ss(seed(), seed(), seed(), seed()) }
        ]

        // Note: 10_000_000 takes ~35 seconds for 4 generators and 1 iteration
        const sample_size = 1_000_000
        // Note 10 iterations takes ~24 seconds (and 1_000_000 samples)
        const iterations = 10

        const results: Result[] = []
        for (let i = 0; i < iterations; i = i + 1) {
            generators.forEach((generator) => results.push(test(generator.rnd, generator.name, sample_size)))
        }

        const accumulated_results: Result[] = []
        generators.forEach((generator) => {
            let deltaTime = 0
            let diversity = 0
            const generator_results = results.filter((result) => result.name === generator.name)
            generator_results.forEach((result) => {
                expect(result).to.have.property("deltaTime")
                expect(result).to.have.property("diversity")
                deltaTime = deltaTime + result.deltaTime
                diversity = diversity + sample_size - result.diversity
            })
            deltaTime = deltaTime / generator_results.length
            diversity = diversity / generator_results.length
            accumulated_results.push({
                name: generator.name,
                deltaTime,
                diversity
            })
        })
        
        console.log(`Accumulated results of ${iterations} iterations generating ${sample_size} numbers:`)
        console.log("Speed (avg.)", [...accumulated_results].sort((a, b) => a.deltaTime - b.deltaTime).map((algo) => `${algo.name}: ${algo.deltaTime} ms`))
        console.log("Duplicates (avg.)", [...accumulated_results].sort((a, b) => a.diversity - b.diversity).map((algo) => `${algo.name}: ${algo.diversity}`))
    })

})
