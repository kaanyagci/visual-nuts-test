
/**
 * Prepares the string to be printed following printing logic
 * @param current The number to print
 * @returns The string which will be printed following the print conventions
 */
export function stringToPrint(current: number): string {
    // The result string will contain the string which will be printed
    let resultString: string = '';
    // Test if the current number is divisible by 3
    if (current % 3 === 0) {
        // If so add visual to the result string
        resultString = 'Visual';
    }
    // Test if the number is divisible by 5
    if (current % 5 === 0) {
        // If the current number is divisible by 5 concatenate the result string with Nuts
        resultString += ' Nuts';
    }
    /* 
        If the result string is still empty, it means that the current number is divisble neither by 5 nor by 3.
        If it's not empty i can contains a trailling space if it's divisible by 5 but not but 3 so we need to trim it
    */ 
    resultString = resultString.length === 0 ? ''+ current : resultString.trim();
    return resultString;
}

/**
 * Prints the current number following the conventions
 * @param current The current number to print
 * @param target The upper bound of the interval
 */
function printNumbersRec(current: number, target: number): void {
    if (current > target) {
        return ;
    }
    // Print the result string to the console
    console.log(stringToPrint(current));
    // Call the same function by increasing the value of current number by 1 (passing the next number)
    return printNumbersRec(current+1, target);
}

/**
 * Print numbers from 1 to target (included) following the conventions
 * @param target The upper bound of the interval
 */
export function printNumbers(target: number) {
    return printNumbersRec(1, target);
}
