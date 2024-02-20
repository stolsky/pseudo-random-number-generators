let prng: () => number = () => 0

const get_prng = (): number => prng()

const setup = (algorithm: () => number): void => {
    prng = algorithm
}

export default get_prng
export {
    setup
}
