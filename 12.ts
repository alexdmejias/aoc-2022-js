import { getAndSplitInput} from './utils';

type Coord = [number, number]
type Matrix = Record<string, Cell>;
type Cell = {
    coords: Coord;
    value: number;
    id: string;
}

function idFromCoords(coords: Coord) {
    return coords.toString();
}

function buildGrid(rawMaze: string[]) {
    const matrix: Matrix = {};
    let start: undefined | Cell;
    let goal: undefined | Cell;

    for (let y = 0; y < rawMaze.length; y++) {
        const row = rawMaze[y];
        const a = row.split('');

        for (let x = 0; x < a.length; x++) {
            const col = a[x];
            const id = idFromCoords([x, y]);
            const cell = {
                value: a[x].charCodeAt(0) - 96,
                coords: [x, y] as Coord,
                id
            };

            if (col === 'S') {
                cell.value = 'a'.charCodeAt(0) - 96;
                start = cell;
            } else if (col === 'E') {
                cell.value = 'z'.charCodeAt(0) - 96;
                goal = cell;
            }

            matrix[id] = cell;

        }
    }

    return {
        matrix,
        start: start as Cell,
        goal: goal as Cell,
    };
}

function getNeighbors(matrix: Matrix, pos: Coord) {
    const [x, y] = pos;

    return [
        matrix[idFromCoords([x, y + 1])],
        matrix[idFromCoords([x, y - 1])],
        matrix[idFromCoords([x + 1, y])],
        matrix[idFromCoords([x - 1, y])],
    ];
}

function getHigherNeighbors(matrix: Matrix, pos: Coord, moves = 1) {
    const cell = matrix[idFromCoords(pos)];
    const target = cell.value + moves;
    return getNeighbors(matrix, pos).filter(c => {
        if (!c) return false;

        return c.value <= target;
    });
}

function buildDistances(matrix: Matrix) {
    const distances: Record<string, number> = {};
    const queue = new Set<string>();

    Object.values(matrix).forEach(cell => {
        distances[cell.id] = Infinity;
        queue.add(cell.id);
    });

    return {distances, queue};
}

function getDijkstra({
    matrix,
    distances,
    goal,
    start,
    queue,
    breakValue
}: {
    matrix: Matrix,
    distances: Record<string, number>,
    goal: Cell,
    start: Cell,
    queue: Set<string>,
    breakValue?: number
}) {
    const prev: Record<string, Cell | undefined> = {};
    distances[start.id] = 0;

    // dijkstras from wikipedia
    while (queue.size) {
        let u: Cell | undefined;

        queue.forEach(i => {
            if (u === undefined || u && distances[i] < distances[u.id]) {
                u = matrix[i];
            }
        });

        u = u as Cell;
        // early escape
        if (u.id === goal.id) {
            break;
        }

        if (Number.isInteger(breakValue) && u.value === breakValue) {
            return distances[u.id];
        }

        queue.delete(u.id);

        const neighbors = getHigherNeighbors(matrix, u.coords);

        for (let i = 0; i < neighbors.length; i++) {
            const v = neighbors[i];

            if (queue.has(v.id)) {
                const alt = distances[u.id] + 1;

                if (alt < distances[v.id]) {
                    distances[v.id] = alt;
                    prev[v.id] = u;
                }
            }
        }
    }

    return distances[goal.id];
}

function part1(preppedInput: string[]) {
    const {start, goal, matrix} =  buildGrid(preppedInput);
    const {distances, queue} = buildDistances(matrix);
    const dijkstra = getDijkstra({matrix, distances, queue, goal, start});

    return dijkstra;
}

function part2(preppedInput: string[]) {
    const {start, goal, matrix} =  buildGrid(preppedInput);
    const {distances, queue} = buildDistances(matrix);

    // todo probably shouldn't hardcode
    let highestValue = -1e10;

    // inversing the values so the getHigherNeighbors still works
    Object.values(matrix).forEach(cell => {
        matrix[cell.id].value = -cell.value;
        if (matrix[cell.id].value > highestValue) {
            highestValue = matrix[cell.id].value;
        }
    });

    const dijkstra = getDijkstra({matrix, distances, queue, start: goal, goal: start, breakValue: highestValue});

    return dijkstra;
}

async function main() {
    const preppedInput: string[] = getAndSplitInput('12');

    console.log('!!!!!!!! part 1', part1(preppedInput));
    console.log('!!!!!!!! part 2', part2(preppedInput));
}

console.time();
main();
console.timeEnd();
