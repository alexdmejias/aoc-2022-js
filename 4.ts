import { getAndSplitInput } from './utils';

function parseRow(row: string) {
    return [...row.matchAll(/\d+/g)].map(c => parseInt(c[0], 10));
}

function checkRanges(range: string, includePartialOverlap = false) {
    const [aMin, aMax, bMin, bMax] = parseRow(range);
    const mins = aMin - bMin;
    const maxs = aMax - bMax;

    if (
        (mins >= 0 && maxs <= 0) ||
        (mins <= 0 && maxs >= 0) ||
        (includePartialOverlap && mins <= 0 && maxs <= 0 && aMax >= bMin) ||
        (includePartialOverlap && mins >= 0 && maxs >= 0 && aMin <= bMax)
    ) {
        return true;
    }
}

function part1(preppedInput: string[]) {
    const a = preppedInput.filter(c => checkRanges(c));

    return a.length;
}

function part2(preppedInput: string[]) {
    const a = preppedInput.filter(c => checkRanges(c, true));

    return a.length;
}

function main() {
    const preppedInput: string[] = getAndSplitInput('4');

    console.log('!!!!!!!!', part1(preppedInput));
    console.log('@@@@@@@@', part2(preppedInput));
}

console.time();
main();
console.timeEnd();
