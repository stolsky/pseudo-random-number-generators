/** Wrapper of the `boxMullerTransform()` for generating normal distributed pseudorandom numbers.
 *
 * Before you can use this method properly, you must set up a PRNG using the setup_prng method.
 *
 * @param {number} m the mean (default = 0)
 * @param {number} sd the standard deviation (default = 1)
 *
 * @returns {number} random number
 */
declare const gauss: (m?: number, sd?: number) => number;
export default gauss;
