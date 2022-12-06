import { getInput } from './utils';

const packetLength = 4;
const messageLength = 14;

function checkCharUniqueness(str: string) {
    const obj: Record<string, boolean> = {};

    for (const char of str) {
        if (obj[char]) {
            return false;
        } else {
            obj[char] = true;
        }
    }

    return true;
}

function wasd(input: string, length: number) {
    for (let i = 0; i < input.length; i++) {
        const charsToCheck = input.slice(i, i + length);
        if (checkCharUniqueness(charsToCheck)) {
            return i + length;
        }
    }
}

function part1(preppedInput: string) {
    return wasd(preppedInput, packetLength);
}

function part2(preppedInput: string) {
    return wasd(preppedInput, messageLength);
}

function main() {
    const preppedInput: string = getInput('6');

    console.log('!!!!!!!!', part1(preppedInput));
    console.log('@@@@@@@@', part2(preppedInput));
}

console.time();
main();
console.timeEnd();
