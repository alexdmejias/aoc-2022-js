import { getAndSplitInput } from './utils';

type TreeResult = {
    visibility: number,
    isVisible: boolean
};

function test(treeHeight: number, trees: string[]): TreeResult {
    const stats = {
        visibility: 0,
        isVisible: false
    };

    for (const tree of trees) {
        stats.visibility++;

        if (parseInt(tree, 10) >= treeHeight) {
            return stats;
        }
    }

    return {...stats, isVisible: true};
}

function getTreeVisibilityResults(treeMatrix: string[], treeXY: [number, number]) {
    const [rowIndex, colIndex] = treeXY;
    const row = treeMatrix[rowIndex];
    const tree = row[colIndex];
    const tH = parseInt(tree, 10);

    const tops = treeMatrix.slice(0, rowIndex).map(t => (t[colIndex])).reverse();
    const bottoms = treeMatrix.slice(rowIndex + 1).map(t => t[colIndex]);
    const lefts = row.slice(0, colIndex).split('').reverse();
    const rights = row.slice(colIndex + 1).split('');

    return [test(tH, tops),
        test(tH, bottoms),
        test(tH, lefts),
        test(tH, rights)];
}

function getAllVisibilityResults(treeMatrix: string[]) {
    const results = [];

    for (let rowIndex = 1; rowIndex < treeMatrix.length - 1; rowIndex++) {
        const row = treeMatrix[rowIndex];

        for (let colIndex = 1; colIndex < row.length - 1 ; colIndex++) {
            results.push(getTreeVisibilityResults(treeMatrix, [colIndex, rowIndex]));
        }
    }

    return results;
}

function part1(preppedInput: string[], allTrees: TreeResult[][]) {
    let total = preppedInput.length * 2;
    total += preppedInput[0].length * 2 - 4;

    allTrees.forEach((curr) => {
        if (curr.find(c => c.isVisible)) {
            total++;
        }
    }, total);

    return total;
}

function part2(allTrees: TreeResult[][]) {
    let highest = 0;

    allTrees.forEach((results) => {
        const score = results.reduce((acc, curr) => acc * curr.visibility, 1);

        if (score > highest) {
            highest = score;
        }
    });

    return highest;
}

function main() {
    const preppedInput: string[] = getAndSplitInput('8');
    const allTrees = getAllVisibilityResults(preppedInput);
    console.log('!!!!!!!! part 1', part1(preppedInput, allTrees));
    console.log('@@@@@@@@ part 2', part2(allTrees));
}

console.time();
main();
console.timeEnd();
