// replaces whitespaces with '+' symbol and returns the string
function cleanString(string) {
    return string.replace(/ /g, "+")
}

module.exports = { cleanString }