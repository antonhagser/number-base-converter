// main.ts
import { convertFromBaseToBase } from "./lib.ts";

function main() {
    function isValidNumber(num: string, base: number): boolean {
        const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(
            0,
            base
        );
        const regex = new RegExp(
            `^[${validChars}]+(\\.[${validChars}]+)?$`,
            "i"
        );
        return regex.test(num);
    }

    function removeTrailingZeros(number: string): string {
        const [integerPart, fractionalPart] = number.split(".");
        const newFractionalPart = fractionalPart?.replace(/0+$/, "");
        return newFractionalPart
            ? `${integerPart}.${newFractionalPart}`
            : integerPart;
    }

    const sourceBase = parseInt(
        prompt("Enter the source base (2-36): ") || "0"
    );
    const targetBase = parseInt(
        prompt("Enter the target base (2-36): ") || "0"
    );
    const precision = parseInt(
        prompt(
            "Enter the precision (number of digits after the decimal point): "
        ) || "5"
    );

    if (
        sourceBase < 2 ||
        sourceBase > 36 ||
        targetBase < 2 ||
        targetBase > 36
    ) {
        console.error(
            "Invalid base. Both source and target bases must be between 2 and 36."
        );
        Deno.exit(1);
    }

    const number =
        prompt(`Enter the number to convert (base ${sourceBase}): `) || "";

    if (isValidNumber(number, sourceBase)) {
        const convertedNumber = convertFromBaseToBase(
            number,
            sourceBase,
            targetBase,
            precision
        );

        console.log(
            `The converted number in base ${targetBase} is: ${removeTrailingZeros(
                convertedNumber
            )}`
        );
    } else {
        console.log("Invalid number for the given base.");
    }
}

main();
