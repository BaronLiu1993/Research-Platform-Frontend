export function removeSingleQuoteOrJson(inputString) {
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

export function removeSingleQuoteOrString(inputString) {
    let modifiedString = inputString;
  
    if (modifiedString.includes("```html")) {
      modifiedString = modifiedString.replace(/^```html\s*/i, '');
    }
  
    if (modifiedString.includes("```")) {
      modifiedString = modifiedString.replace(/```/g, '');
    }
  
    if (modifiedString.includes("`")) {
      modifiedString = modifiedString.replace(/`/g, '');
    }
  
    return modifiedString;
  }
  
  