/**
 * @param a seed
 *
 * @returns function that generates pseudo random numbers
 */
declare const splitmix32: (a: number) => () => number;
export default splitmix32;
