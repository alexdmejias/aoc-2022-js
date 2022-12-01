const {getAndSplitInput, sortInputsDesc} = require('./utils');

function groupInputs(preppedInput) {
    return preppedInput.reduce((acc, curr) => {
        if (curr === '') {
            acc.push([]);
        } else {
            const lastElf = parseInt(acc.at(-1), 0) || 0;
            const b = parseInt(curr, 10);
            acc[acc.length - 1] = lastElf + b;
        }

        return acc;
    }, [[]]);
}

function part1() {
    const preppedInput = getAndSplitInput('1');
    const groupedInputs = groupInputs(preppedInput);

    console.log('part 1 =', sortInputsDesc(groupedInputs)[0]);
}

function part2() {
    const preppedInput = getAndSplitInput('1');

    const groupedInputs = groupInputs(preppedInput);
    const sortedInputs = sortInputsDesc(groupedInputs);

    console.log('part 2 =', sortedInputs.slice(0, 3).reduce((acc, curr) => {
        return acc += curr;
    }, 0));
}

part1();
part2();
