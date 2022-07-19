const getMaxCharIndex = (str = '', firstСhar = '', secondСhar = '') => {
    if (str === '' || str === null) {
        return -1;
    }

    const firstCharIndex = firstСhar === '' ? -1 : str.lastIndexOf(firstСhar);
    const secondCharIndex = secondСhar === '' ? -1 : str.lastIndexOf(secondСhar);

    return Math.max(firstCharIndex, secondCharIndex);
};

console.log('===1', getMaxCharIndex('hello world', 'f', 'r'));
console.log('===1', getMaxCharIndex('hello world', 'l', 'r'));
console.log('===1', getMaxCharIndex('hello world', '', 'r'));

// __________
const getMaxСharIndex2 = (str, char1, char2) => {
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === char1 || str[i] === char2) {
            return i;
        }
    }

    return -1;
};

console.log('===2', getMaxСharIndex2('hello world', 'e', 'w'))