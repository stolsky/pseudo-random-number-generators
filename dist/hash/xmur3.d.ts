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
declare const xmur3: (str: string) => () => number;
export default xmur3;
