/** Generates a random number from an internal random number generator.
 *
 * It is possible to use "from" and "to" to specify an interval in which the number should be located.
 *
 * Before you can use this method properly, you must set up a PRNG using the setup_prng method.
 *
 * @param {number} from
 * @param {number} to
 * @returns {number}
 */
declare const random: (from?: number, to?: number) => number;
export default random;
