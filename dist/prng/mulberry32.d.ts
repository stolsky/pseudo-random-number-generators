/**
 * Original C implementation: https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 *
 * @param a seed
 *
 * @returns function that generates pseudo random numbers
 */
declare const mulberry32: (a: number) => () => number;
export default mulberry32;
