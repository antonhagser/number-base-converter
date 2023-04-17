/**
 * A string containing all possible digits and letters for bases up to 36.
 */
const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Returns the character representation of the given digit.
 * @param digit - The digit to convert to character.
 */
function digitToCharacter(digit: number): string {
    return digits[digit];
}

/**
 * Returns the digit representation of the given character.
 * @param character - The character to convert to digit.
 */
function characterToDigit(character: string): number {
    return digits.indexOf(character);
}

/**
 * Converts a base-10 integer to a string representation in the specified base.
 * @param num - The base-10 integer to convert.
 * @param base - The target base for the conversion.
 */
function convertIntegerFromBase10(num: number, base: number): string {
    if (base < 2 || base > 36) {
        throw new Error("Base must be between 2 and 36");
    }

    let rests: string[] = [];

    // Calculate the quotient and remainder for the given base
    let rest = num % base;
    let kvot = Math.floor(num / base);
    while (kvot > 0) {
        rests.push(digitToCharacter(rest)); // Convert the remainder to a character

        rest = kvot % base;
        kvot = Math.floor(kvot / base);
    }

    rests.push(digitToCharacter(rest));
    rests = rests.reverse();

    return rests.join("");
}

/**
 * Converts a base-10 fractional number to a string representation in the specified base with the specified precision.
 * @param num - The base-10 fractional number to convert.
 * @param base - The target base for the conversion.
 * @param precision - The number of digits after the decimal point.
 */
function convertFractionFromBase10(
    num: number,
    base: number,
    precision: number = 5
): string {
    if (base < 2 || base > 36) {
        throw new Error("Base must be between 2 and 36");
    }

    let integerPart = Math.floor(num);
    let fractionalPart = num - integerPart;

    let fractionalDigits: string[] = [];
    for (let i = 0; i < precision; i++) {
        fractionalPart = fractionalPart * base;
        let integerComponent = Math.floor(fractionalPart);
        fractionalDigits.push(digitToCharacter(integerComponent));
        fractionalPart = fractionalPart - integerComponent;
    }

    return fractionalDigits.join("");
}

/**
 * Converts a base-10 number (integer and fractional parts) to a string representation in the specified base with the specified precision.
 * @param num - The base-10 number to convert.
 * @param base - The target base for the conversion.
 * @param precision - The number of digits after the decimal point.
 */
function convertFromBase10(
    num: number,
    base: number,
    precision: number = 5
): string {
    if (base < 2 || base > 36) {
        throw new Error("Base must be between 2 and 36");
    }

    let integerPart = Math.floor(num);
    let fractionalPart = num - integerPart;

    let integerPartString = convertIntegerFromBase10(integerPart, base);
    let fractionalPartString = convertFractionFromBase10(
        fractionalPart,
        base,
        precision
    );

    return integerPartString + "." + fractionalPartString;
}

/**
 * Converts a string representation of an integer in the specified base to a base-10 integer.
 * @param num - The string representation of the integer to convert.
 * @param base - The source base of the integer.
 */
function convertIntegerToBase10(num: string, base: number): number {
    let result = 0;
    for (let i = 0; i < num.length; i++) {
        let digitValue = characterToDigit(num[i]); // Convert character to digit
        result = result * base + digitValue;
    }
    return result;
}

/**
 * Converts a string representation of a fractional number in the specified base to a base-10 fractional number.
 * @param num - The string representation of the fractional number to convert.
 * @param base - The source base of the fractional number.
 */
function convertFractionToBase10(num: string, base: number): number {
    let result = 0;
    let multiplier = 1 / base;
    for (let i = 0; i < num.length; i++) {
        let digitValue = characterToDigit(num[i]); // Convert character to digit
        result += digitValue * multiplier;
        multiplier /= base;
    }
    return result;
}

/**
 * Converts a string representation of a number (integer and fractional parts) in the specified base to a base-10 number with the specified precision.
 * @param num - The string representation of the number to convert.
 * @param base - The source base of the number.
 * @param precision - The number of digits after the decimal point.
 */
function convertToBase10(num: string, base: number, precision: number): number {
    if (base < 2 || base > 36) {
        throw new Error("Base must be between 2 and 36");
    }

    const [integerPart, fractionalPart] = num.split(".");

    let integerValue = convertIntegerToBase10(integerPart, base);
    let fractionalValue = fractionalPart
        ? convertFractionToBase10(fractionalPart, base)
        : 0;

    const result = integerValue + fractionalValue;
    return parseFloat(result.toFixed(precision));
}

/**
 * Converts a string representation of a number (integer and fractional parts) from the source base to the target base with the specified precision.
 * @param num - The string representation of the number to convert.
 * @param sourceBase - The source base of the number.
 * @param targetBase - The target base for the conversion.
 * @param precision - The number of digits after the decimal point.
 */
export function convertFromBaseToBase(
    num: string,
    sourceBase: number,
    targetBase: number,
    precision: number = 5
): string {
    let base10 = convertToBase10(num, sourceBase, precision);
    return convertFromBase10(base10, targetBase, precision);
}
