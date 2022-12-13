import { getAndSplitInput} from './utils';

type MonkeyArgs = {
    items: number[];
    modifier: number | string;
    operationIsAddition: boolean;
    operation: string;
    divider: number;
    neighbors: [number, number];
}

const getOpResult = (curr: number, op: boolean, modifier: number | string) => {
    const a = modifier === 'old' ? curr : modifier as number;

    return op ? curr + a : curr * a;
};
class Monkey {
    items: number[] = [];
    ogItems: number[] = [];
    modifier: number | string;
    operationIsAddition: boolean;
    divider = 0;
    operation = '';
    neighbors: number[] = [];
    totalInspections: 0;

    constructor({items, modifier, operationIsAddition, divider, neighbors, operation}: MonkeyArgs) {
        this.items = items;
        this.ogItems = items;
        this.modifier = modifier;
        this.operationIsAddition = operationIsAddition;
        this.operation = operation;
        this.divider = divider;
        this.neighbors = neighbors;
        this.totalInspections = 0;
    }

    static parseMonkey(lines: string[]): MonkeyArgs {
        const segs = lines.map(c => c.split(':'));
        const operationSegs = segs[1][1].split(' ');

        return {
            items: segs[0][1].split(',').map(c => parseInt(c, 10)) as [number, number],
            operationIsAddition: operationSegs[4] === '+',
            operation: operationSegs.slice(3).join(' '),
            modifier: operationSegs[5] === 'old' ? 'old' : parseInt(operationSegs[5], 10),
            divider: parseInt((segs[2][1].split(' ')).at(-1) as string, 10),
            neighbors: [
                parseInt((segs[3][1].split(' ')).at(-1) as string, 10),
                parseInt((segs[4][1].split(' ')).at(-1) as string, 10)
            ]
        };
    }

    turn(monkeys: Monkey[], worryReducer = 1, maxStress = 0) {

        this.totalInspections+= this.items.length;

        while (this.items.length) {
            let item = this.items.shift();

            if (item) {
                const opResult = getOpResult(item, this.operationIsAddition, this.modifier);

                if (worryReducer > 1) {
                    item = Math.floor(opResult / worryReducer);
                } else {
                    item = opResult % maxStress;
                }

                const toNeighbor = item % this.divider === 0 ? 0 : 1;

                monkeys[this.neighbors[toNeighbor]].items.push(item);
            }
        }
    }

    reset() {
        this.items = [...this.ogItems];
        this.totalInspections = 0;
    }
}

function getMonkeyStrings(lines: string[]) {
    const rawMonkeys: string[][] = [];

    for (const line of lines) {
        if (line.slice(0, 6) === 'Monkey') {
            rawMonkeys.push([]);
        } else if (line !== '') {
            rawMonkeys[rawMonkeys.length - 1].push(line);
        }
    }

    return rawMonkeys;
}

function getMonkeyBiz(monkeys: Monkey[], turns: number, worryReducer: number) {
    let maxStress = 1;
    monkeys.forEach((m) => {
        maxStress *= m.divider;
        m.reset();
    });

    for (let i = 1; i <= turns; i++) {
        monkeys.forEach((m) => {
            m.turn(monkeys, worryReducer, maxStress);
        });
    }

    const allBiz = monkeys.map((m) => m.totalInspections);
    const sorted = allBiz.sort((a, b) => b - a );
    const topTwo = sorted.slice(0, 2);
    const biz = topTwo.reduce((acc, curr) => acc *= curr, 1);

    return biz;
}

function part1(monkeys: Monkey[]) {
    return getMonkeyBiz(monkeys, 20, 3);
}

function part2(monkeys: Monkey[]) {
    return getMonkeyBiz(monkeys, 10000, 1);
}

function main() {
    const preppedInput: string[] = getAndSplitInput('11');
    const monkeys = getMonkeyStrings(preppedInput).map(c => {
        return new Monkey(Monkey.parseMonkey(c));
    });

    console.log('!!!!!!!! part 1', part1(monkeys));
    console.log('!!!!!!!! part 2', part2(monkeys));
}

console.time();
main();
console.timeEnd();


