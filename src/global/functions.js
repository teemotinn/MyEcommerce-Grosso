export function capitalizeWords(inputString) {
    const words = inputString.split(" ");
    const capitalizedWords = words.map((word) => {
        if (word.length === 0) {
            return word;
        }
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return capitalizedWord;
    });
    const resultString = capitalizedWords.join(" ");
    return resultString;
}
