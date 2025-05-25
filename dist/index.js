/* Example of a facade for a pseudo random number generator.
 * Source: https://github.com/stolsky/pseudo-random-number-generators/tree/main
 *
 * The interface provides the methods random() and gauss().
 */
import gauss from "./utils/gauss";
import mulberry32 from "./prng/mulberry32";
import random from "./utils/random";
import { setup } from "./utils/prng";
import sfc32 from "./prng/sfc32";
import splitmix32 from "./prng/splitmix32";
import xmur3 from "./hash/xmur3";
import xoshiro128ss from "./prng/xoshiro128ss";
export { gauss, mulberry32, random, setup as setup_prng, sfc32, splitmix32, xmur3, xoshiro128ss };
