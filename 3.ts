import { getAndSplitInput, sum, isUppercase, chunkArray } from './utils';

function getItemPriority(letter: string) {
    const charIndex = letter.charCodeAt(0);

    return charIndex - (isUppercase(charIndex) ? 96 : 38);
}

function findCommonChar(inputs: string[]) {
    const sortedInputs = inputs.sort((a, b) => a.length - b.length);
    const source = sortedInputs[0];
    const targets = sortedInputs.slice(1);

    for (const letter of source) {
        if (targets.every((curr) => curr.includes(letter))) {
            return letter;
        }
    }
}

function part1(preppedInput: string[]) {
    const outputs = preppedInput.map(curr => {
        const strHalf = curr.length / 2;
        const firstHalf = curr.slice(0, strHalf);
        const secondHalf = curr.slice(strHalf);

        const repeats = findCommonChar([firstHalf, secondHalf]) as string;
        return getItemPriority(repeats);
    });

    return sum(outputs);
}

function part2(preppedInput: string[]) {
    const chunkedInput = chunkArray(preppedInput, 3);
    const commonChars = chunkedInput.map(findCommonChar) as string[];

    return sum(commonChars.map(getItemPriority));

}

function main() {
    const preppedInput: string[] = getAndSplitInput('3');

    console.log('!!!!!!!!', part1(preppedInput));
    console.log('@@@@@@@@', part2(preppedInput));
}

main();
