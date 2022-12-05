import { getAndSplitInput, sum } from './utils';

const SCISSORS = 'SCISSORS';
const ROCK = 'ROCK';
const PAPER = 'PAPER';

type Plays = typeof SCISSORS | typeof ROCK | typeof PAPER;

const mappings: Record<string, Plays> = {
    'A': ROCK,
    'X': ROCK,
    'B': PAPER,
    'Y': PAPER,
    'C': SCISSORS,
    'Z': SCISSORS
} as const;

type MappingKeys = keyof typeof mappings;

const winners: Record<Plays, Plays> = {
    [SCISSORS]: PAPER,
    [ROCK]: SCISSORS,
    [PAPER]: ROCK
};

const losers: Record<Plays, Plays> = {
    [PAPER]: SCISSORS,
    [SCISSORS]: ROCK,
    [ROCK]: PAPER
};

const scores: Record<Plays, number> = {
    [ROCK]: 1,
    [PAPER]: 2,
    [SCISSORS]: 3,
};

const outcomePoints = {
    'X': 0,
    'lose': 0,
    'Y': 3,
    'draw': 3,
    'Z': 6,
    'win': 6,
} as const;

type OutcomePointsKeys = keyof typeof outcomePoints;

function getMatchupScore(player1Hand: Plays, player2Hand: Plays) {
    // draw
    if (player1Hand === player2Hand) {
        return outcomePoints['draw'];
    // player 1 wins
    } else if (winners[player1Hand] === player2Hand) {
        return outcomePoints['lose'];
    }

    // player 2 wins
    return outcomePoints['win'];
}

function part1(preppedInput: string[]) {
    const outputs = preppedInput.map((curr) => {
        const [player1, player2] = curr.split(' ') as [MappingKeys, MappingKeys];
        const player1Hand = mappings[player1];
        const player2Hand = mappings[player2];
        const matchScore = getMatchupScore(player1Hand, player2Hand);

        return matchScore + scores[player2Hand];
    });

    return sum(outputs);
}

function part2(preppedInput: string[]) {
    const outputs = preppedInput.map((curr) => {
        const [player1, neededOutcome] = curr.split(' ') as [MappingKeys, OutcomePointsKeys ];
        const player1Hand = mappings[player1];
        const matchOutcome = outcomePoints[neededOutcome];

        let player2Hand = winners[player1Hand];

        if (matchOutcome === 3) {
            player2Hand = player1Hand;
        } else if (matchOutcome === 6) {
            player2Hand = losers[player1Hand];
        }

        return  matchOutcome + scores[player2Hand];
    });

    return sum(outputs);
}

function main() {
    const preppedInput = getAndSplitInput('2');

    console.log('!!!!!!!!', part1(preppedInput));
    console.log('@@@@@@@@', part2(preppedInput));
}

main();
