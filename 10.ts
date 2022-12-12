import { getAndSplitInput} from './utils';

function isWanted(op: number) {
    return op % 40 === 20 && op >= 20 && op <= 220;
}

function calculateRegister(lines: string[][]) {
    let X = 1;
    let cycle = 0;
    let answer = 0;

    for (const line of lines) {
        const isNoop = line[0] === 'noop';
        const cycles = isNoop ? 1 : 2;

        for (let i = 0; i < cycles; i++) {
            cycle += 1;

            if (isWanted(cycle)){
                answer += cycle * X;
            }
        }
        if (!isNoop) {
            const qty = parseInt(line[1], 10);
            X += qty;
        }

    }

    return answer;

}

function part1(preppedInput: string[][]) {
    const values = calculateRegister(preppedInput);

    return values;
}

function part2(preppedInput: string[][]) {
    const spriteWidth = 3;
    const crtWidth = 40;
    const ON = '█';
    const OFF = ' ';

    let X = 1;
    let cycle = 0;
    let currPixel = 0;
    let output = '';

    for (const line of preppedInput) {
        const isNoop = line[0] === 'noop';
        const cycles = isNoop ? 1 : 2;

        for (let i = 0; i < cycles; i++) {
            cycle += 1;

            const start = X - 1;
            const pixel = currPixel >= start && currPixel < start + spriteWidth ? ON : OFF;

            output += pixel;
            currPixel++;

            if (cycle % crtWidth === 0) {
                output += '\n';
                currPixel = 0;
            }
        }

        if (!isNoop) {
            const qty = parseInt(line[1], 10);
            X += qty;
        }
    }

    return output;
}

function main() {
    const preppedInput: string[][] = getAndSplitInput('10').map(c => c.split(' '));

    console.log('!!!!!!!! part 1', part1(preppedInput));
    const part2Output = part2(preppedInput);
    console.log(part2Output);
}

console.time();
main();
console.timeEnd();
