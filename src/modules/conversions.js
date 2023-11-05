export function ConvertToExponent(number, exponent) {
    const million =  Math.pow(10, 6);
    const billion =  Math.pow(10, 9);
    const trillion = Math.pow(10, 12);

    if (exponent === '') return number;
    if (exponent === 'M') return number / million;
    if (exponent === 'B') return number / billion;
    if (exponent === 'T') return number / trillion;
}

