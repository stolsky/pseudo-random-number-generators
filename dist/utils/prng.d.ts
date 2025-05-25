declare const get_prng: () => number;
declare const setup: (algorithm: () => number) => void;
export default get_prng;
export { setup };
