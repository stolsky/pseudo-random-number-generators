/**
 * @param a seed
 *
 * @returns function that generates pseudo random numbers
 */
const splitmix32 = (a: number) => () => {
    a |= 0
    a = a + 0x9e3779b9 | 0
    let t = a ^ a >>> 16
    t = Math.imul(t, 0x21f0aaad)
    t = t ^ t >>> 15
    t = Math.imul(t, 0x735a2d97)
    t = t ^ t >>> 15
    return (t >>> 0) / 4294967296
}

export default splitmix32
