/** Calculates all permutations of a string.
 *
 * source: https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/js/s/string-permutations.md
 * @param {string} str
 * @returns {Array<string>}
 */
const string_permutations = (str: string): string[] => {
    if (str.length <= 2) {
        return str.length === 2 ? [str, str[1] + str[0]] : [str]
    }
    return str.split("").reduce(
        (acc: string[], letter, i) => acc.concat(
            string_permutations(str.slice(0, i) + str.slice(i + 1))
                .map((val) => letter + val)
        ),
        []
    )
}

const generate_numbers_from_algorithm = (algorithm: () => number, test_size: number): Set<number> => {
    const numbers = new Set<number>()
    for (let i = 0; i < test_size; i = i + 1) {
        numbers.add(algorithm())
    }
    return numbers
}

export {
    generate_numbers_from_algorithm,
    string_permutations
}
