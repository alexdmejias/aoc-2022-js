import { getAndSplitInput } from './utils';

type Move = [number, number, number];
type Stack = Array<string>;
type Stacks = Array<Stack>;

const stacksRegex = /((\[[A-Z]\])|\s{3})\s?/g;
const movesRegex = /\d+/g;

function addLineToStack(stacks: Array<string[]>, line: string) {
    let index = 0;

    for(const match of line.matchAll(stacksRegex)) {
        if (!stacks[index]) {
            stacks.push([]);
        }

        if (match[0][0] === ' ') {
            // stacks[index].push(' ');
        } else {
            stacks[index].unshift(match[0][1]);
        }

        index++;

    }
}

function getStacks(inputLines: string[]): Stacks {
    const stacks: Array<string[]> = [];
    let foundMovesLine = false;
    let currLineIndex = 0;

    while (!foundMovesLine) {
        if (inputLines[currLineIndex][1] === '1') {
            foundMovesLine = true;
            break;
        }
        addLineToStack(stacks, inputLines[currLineIndex]);

        currLineIndex++;
    }

    return stacks;
}

function applyMoves(stacks: Stacks, inputLines: string[], canMoveMultiple = false): Stacks {
    let currLineIndex = 0;
    let firstMoveLine;

    while (!firstMoveLine) {
        const currLine = inputLines[currLineIndex];

        if (currLine.slice(0,4) === 'move') {
            firstMoveLine = currLineIndex;
            break;
        }

        currLineIndex++;
    }

    while (currLineIndex < inputLines.length) {
        const [qty, source, target] =  Array.from(
            (inputLines[currLineIndex]).matchAll(movesRegex),
            m => parseInt(m[0], 10)
        ) as Move;
        const sourceStack = stacks[source - 1];
        const targetStack = stacks[target - 1];
        const stacksToMove = canMoveMultiple ? qty : 1;

        for(let i = 0; i < qty; i += stacksToMove) {
            const toMove = sourceStack.splice(sourceStack.length - stacksToMove);

            targetStack.push(...toMove);
        }

        currLineIndex++;
    }

    return stacks;

}

function part1(preppedInput: string[]) {
    const stacks = getStacks(preppedInput);
    const stackWithMoves = applyMoves(stacks, preppedInput);

    const result = stackWithMoves.reduce((acc, stack) => acc + stack.at(-1), '');

    return result;
}

function part2(preppedInput: string[]) {
    const stacks = getStacks(preppedInput);
    const stackWithMoves = applyMoves(stacks, preppedInput, true);

    const result = stackWithMoves.reduce((acc, stack) => acc + stack.at(-1), '');

    return result;
}

function main() {
    const preppedInput: string[] = getAndSplitInput('5');

    console.log('!!!!!!!!', part1(preppedInput));
    console.log('@@@@@@@@', part2(preppedInput));
}

console.time();
main();
console.timeEnd();
