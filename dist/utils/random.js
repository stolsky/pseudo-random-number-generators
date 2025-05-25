import prng from "./prng";
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
const random = (from = 0, to = 1) => {
    const next = prng();
    if (Number.isFinite(from) && Number.isFinite(to) && from < to) {
        return from + next * (to - from);
    }
    return next;
};
export default random;
