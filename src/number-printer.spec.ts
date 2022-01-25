import { printNumbers, stringToPrint } from "./number-printer";

describe('Test printing numbers', () => {
    it.each([
        [1, '1'],
        [2, '2'],
        [3, 'Visual'],
        [4, '4'],
        [5, 'Nuts'],
        [6, 'Visual'],
        [7, '7'],
        [8, '8'],
        [9, 'Visual'],
        [10, 'Nuts'],
        [11, '11'],
        [12, 'Visual'],
        [13, '13'],
        [14, '14'],
        [15, 'Visual Nuts'],
        [16, '16'],
    ])('%i printed as %s', (target: number, expected: string) => {
        expect(stringToPrint(target)).toBe(expected);
    });

    it(' test number of console.log called printing', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const targetInteger: number = 500;
        printNumbers(targetInteger)
      
        expect(consoleSpy).toHaveBeenCalledTimes(targetInteger);
        expect(consoleSpy).toHaveBeenLastCalledWith(stringToPrint(targetInteger))
    });
});