const TWO_POW_32 = 2 ** 32

// https://prng.di.unimi.it/
// https://vigna.di.unimi.it/ftp/papers/ScrambledLinear.pdf

const xoshiro128ss = (a: number, b: number, c: number, d: number) => () => {
    const t = b << 9
    let r = a * 5
    r = ((r << 7) | (r >>> 25)) * 9
    c = c ^ a
    d = d ^ b
    b = b ^ c
    a = a ^ d
    c = c ^ t
    d = (d << 11) | (d >>> 21)
    return (r >>> 0) / TWO_POW_32
}

export default xoshiro128ss