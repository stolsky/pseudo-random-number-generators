import prng from "./prng";
/** Implementation of the Box-Muller transform
 *
 * Takes two samples from the uniform distribution on the interval [0,1] and maps them to two standard, normally distributed samples.
 *
 * source: https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 *
 * @returns {[number, number]} two standard, normally distributed samples
 */
const box_muller_transform = () => {
    const u1 = prng();
    const u2 = prng();
    const magnitude = Math.sqrt(-2.0 * Math.log(u1));
    const O = 2.0 * Math.PI * u2;
    return [
        magnitude * Math.cos(O),
        magnitude * Math.sin(O)
    ];
};
let left_sample;
/** Wrapper of the `boxMullerTransform()` for generating normal distributed pseudorandom numbers.
 *
 * Before you can use this method properly, you must set up a PRNG using the setup_prng method.
 *
 * @param {number} m the mean (default = 0)
 * @param {number} sd the standard deviation (default = 1)
 *
 * @returns {number} random number
 */
const gauss = (m = 0, sd = 1) => {
    let next_sample = left_sample;
    if (next_sample === undefined) {
        [next_sample, left_sample] = box_muller_transform();
    }
    return m + (next_sample) * sd;
};
export default gauss;
