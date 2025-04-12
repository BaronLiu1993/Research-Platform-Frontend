export default function removeSingleQuoteOrJson(inputString) {
    let modifiedString = inputString;

    if (modifiedString.includes("'")) {
        modifiedString = modifiedString.replace(/'/g, '');
    }

    if (modifiedString.toLowerCase().includes("json")) {
        modifiedString = modifiedString.replace(/json/gi, '');
    }

    modifiedString = modifiedString.replace(/`/g, '');

    return modifiedString;
}