const TWO_POW_32 = 2 ** 32

/**
 * Original C implementation: https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 *
 * @param a seed
 *
 * @returns function that generates pseudo random numbers
 */
const mulberry32 = (a: number) => () => {
    a = a | 0
    a = a + 0x6D2B79F5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / TWO_POW_32
}

export default mulberry32