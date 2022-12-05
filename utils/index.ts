import fs from 'fs';
import path from 'path';

function getInput(fileIndex: string) {
    return fs.readFileSync(path.join(__dirname, '..', 'inputs', `${fileIndex}.txt`), 'utf-8');
}

function prepInput(rawInput: string) {
    return rawInput.split('\n').slice(0, -1);
}

function getAndSplitInput(index: string) {
    return prepInput(getInput(index));
}

function sortInputsDesc(inputs: number[]) {
    return inputs.sort((a, b) => b - a);
}

function sum(inputs: number[]) {
    return inputs.reduce((acc, curr) => acc + curr, 0);
}

function chunkArray<T>(source: Array<T>, size: number) {
    const chunks: T[][] = [];

    for (let i = 0; i < source.length; i += size) {
        const slice = source.slice(i, i + size);
        chunks.push(slice);
    }

    return chunks;
}

function isUppercase(charIndex: number) {
    return charIndex >= 97 && charIndex <= 122;
}

function strToMap(str = '') {
    const map: Record<string, number> = {};

    for (const letter of str) {
        map[letter] = map[letter] ? map[letter] + 1 : 1;
    }

    return map;
}

export {
    getInput,
    prepInput,
    getAndSplitInput,
    sortInputsDesc,
    sum,
    chunkArray,
    isUppercase,
    strToMap
};
