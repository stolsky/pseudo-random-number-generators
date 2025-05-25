import { TWO_POW_32 } from "../utils/math_consts";
const sfc32 = (a, b, c, d) => () => {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    const t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21) | (c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / TWO_POW_32;
};
export default sfc32;
