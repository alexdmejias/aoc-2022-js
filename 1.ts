import { getAndSplitInput, sortInputsDesc, sum } from './utils';

function groupInputs(preppedInput: string[]): number[] {
    const init = [0];
    return preppedInput.reduce((acc, curr) => {
        if (curr === '') {
            acc.push(0);
        } else {
            const lastElf = acc.at(-1) || 0;
            const b = parseInt(curr, 10);
            acc[acc.length - 1] = lastElf + b;
        }

        return acc;
    }, init);
}

function part1(preppedInput: string[]) {
    const groupedInputs = groupInputs(preppedInput);

    return sortInputsDesc(groupedInputs)[0];
}

function part2(preppedInput: string[]) {
    const groupedInputs = groupInputs(preppedInput);
    const sortedInputs = sortInputsDesc(groupedInputs);

    return sum(sortedInputs.slice(0, 3));
}
function main() {
    const preppedInput = getAndSplitInput('1');

    console.log('!!!!!!!!', part1(preppedInput));
    console.log('@@@@@@@@', part2(preppedInput));
}

main();
