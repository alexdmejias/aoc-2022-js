import { getAndSplitInput } from './utils';

type Step = [string, number];
type Coord = [number, number];

function calculateDeltas(dir: string) {
    let deltaX = 0;
    let deltaY = 0;

    if (dir === 'R') {
        deltaX = 1;
    } else if (dir === 'L') {
        deltaX = -1;
    }

    if (dir === 'U') {
        deltaY = 1;
    } else if (dir === 'D') {
        deltaY = -1;
    }
    return [deltaX, deltaY];
}

function calculateTailPositions(preppedInput: Step[], ropeLength = 2) {
    const visitedCoords: Record<string, boolean> = {};
    const rope = new Array(ropeLength).fill([0, 0]) as Coord[];

    preppedInput.forEach(([dir, qty]) => {
        for (let i = 0; i < qty; i++) {

            const [deltaX, deltaY] = calculateDeltas(dir);

            rope[0][0] += deltaX;
            rope[0][1] += deltaY;

            for (let i = 0; i < ropeLength; i++) {
                const [h0, h1] = rope[i];
                const nextKnot = rope[i + 1];

                if (nextKnot) {
                    let tx = nextKnot[0];
                    let ty = nextKnot[1];

                    const _x = h0 - tx;
                    const _y = h1 - ty;

                    if (Math.abs(_x) > 1 || Math.abs(_y) > 1) {
                        if (_x === 0) {
                            ty += _y / 2;
                        } else if (_y == 0) {
                            tx += _x / 2;
                        } else {
                            tx += _x > 0 ? 1 : -1;
                            ty += _y > 0 ? 1 : -1;
                        }
                    }

                    rope[i + 1] = [tx, ty];

                }
            }

            visitedCoords[(rope.at(-1) as Coord).toString()] = true;

        }

    });

    return Object.keys(visitedCoords).length;
}

function part1(preppedInput: Step[]) {
    return calculateTailPositions(preppedInput, 2);
}

function part2(preppedInput: Step[]) {
    return calculateTailPositions(preppedInput, 10);
}

function main() {
    const preppedInput: Step[] = getAndSplitInput('9').map(line => {
        return [line[0], parseInt(line.slice(2), 10)] as Step;
    });
    console.log('!!!!!!!! part 1', part1(preppedInput));
    console.log('@@@@@@@@ part 2', part2(preppedInput));
}

console.time();
main();
console.timeEnd();
