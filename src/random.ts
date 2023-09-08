/* Example of a facade for a pseudo random number generator.
 * Source: https://github.com/stolsky/pseudo-random-number-generators/tree/main
 *
 * The interface provides the methods random() and gauss()
 * as well as an explicit setSeed() method.
 */

import xmur3 from "./hash/xmur3"
import xoshiro128ss from "./prng/xoshiro128ss"

let prng: () => number

/** Implementation of the Box-Muller transform
 *
 * Takes two samples from the uniform distribution on the interval [0,1] and maps them to two standard, normally distributed samples.
 *
 * source: https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 *
 * @returns {[number, number]} two standard, normally distributed samples
 */
const boxMullerTransform = (): [number, number] => {

    const u1 = prng()
    const u2 = prng()

    const magnitude = Math.sqrt(-2.0 * Math.log(u1))
    const O = 2.0 * Math.PI * u2

    return [
        magnitude * Math.cos(O),
        magnitude * Math.sin(O)
    ]
}

let samples: number[] = []
/** Wrapper of the `boxMullerTransform()` for generating normal distributed pseudorandom numbers.
 *
 * @param {number} m the mean (default = 0)
 * @param {number} sd the standard deviation (default = 1)
 *
 * @returns {number} random number
 */
const gauss = (m: number = 0, sd: number = 1): number => {
    if (samples.length === 0) {
        samples = boxMullerTransform()
    }
    return m + (samples.pop() as number) * sd
}

/** Generates a random number from an internal random number generator.
 *
 * It is possible to use "from" and "to" to specify an interval in which the number should be located.
 *
 * @param {number} from
 * @param {number} to
 * @returns {number}
 */
const random = (from: number = 0, to: number = 1): number => {
    const next = prng()
    if (Number.isFinite(from) && Number.isFinite(to)) {
        return from + next * (to - from)
    }
    return next
}

/** Creates a new random number generator with the given seed.
 *
 * If "seed" is omitted a random number from `Math.random()` is used as string.
 *
 * @param {string} seed
 */
const set_seed = (seed: string = ""): void => {
    const useSeed = seed.length === 0 ? `${Math.random()}` : seed
    const hash = xmur3(useSeed)
    prng = xoshiro128ss(hash(), hash(), hash(), hash())
}

// initialization so `random()` and `gauss()` can be used right from the start
set_seed()

export default random
export {
    gauss,
    set_seed
}
