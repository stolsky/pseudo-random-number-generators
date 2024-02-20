/** Hash function for generating hashes to be used as seeds in pseudorandom number generators (PRNG).
 *
 * @param {string} str
 *
 * Example:
 * ```
 * var seed = xmur3("apples");
 * var rand = sfc32(seed(), seed(), seed(), seed());
 * rand();
 * rand();
 * ```
 *
 * @returns a function that generates a new "random" 32-bit hash value each time
 */
const xmur3 = (str: string): () => number => {
    let h = 1779033703 ^ str.length
    for (let i = 0; i < str.length; i = i + 1) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
        h = (h << 13) | (h >>> 19)
    }
    return () => {
        h = Math.imul(h ^ h >>> 16, 2246822507)
        h = Math.imul(h ^ h >>> 13, 3266489909)
        h = h ^ h >>> 16
        return h >>> 0
    }
}

export default xmur3
