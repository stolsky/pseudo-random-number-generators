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

export {
    string_permutations
}