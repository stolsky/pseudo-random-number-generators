let prng = () => 0;
const get_prng = () => prng();
const setup = (algorithm) => {
    prng = algorithm;
};
export default get_prng;
export { setup };
