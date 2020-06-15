import { IBattedResult } from "./models/BattedResult"
import { randomNumber } from "../helpers/RandomNumber"

class Player {

    readonly nameFirst: string;
    readonly nameLast: string;
    readonly fielding: {[key: string]: number};
    private inGame: boolean;
    private ratings: {[key: string]: IBattedResult}[][];

    constructor(_nameFirst: string, _nameLast: string, _fielding: {[position: string]: number}, _ratings: {[rollOdds: string]: IBattedResult}[][]) {
        this.nameFirst = _nameFirst;
        this.nameLast = _nameLast;
        this.fielding = _fielding;
        this.ratings = _ratings;
        this.inGame = false;
    }

    get fullName(): string {
        return `${this.nameFirst} ${this.nameLast}`;
    }

    get isInGame(): boolean {
        return this.inGame
    }

    putIntoGame() {
        this.inGame = true;
    }

    getPlayResult(colIndex: number, rowIndex: number): IBattedResult {

        const resultOdds = this.ratings[colIndex][rowIndex];

        const playResult = randomNumber(1, 20);

        const odds = Object.keys(resultOdds)
        
        for (let i = 0; i < odds.length; ++i) {
            const parsedOdds = odds[i].split("_").map(limit => Number(limit));

            if (playResult >= parsedOdds[0] &&
                playResult <= parsedOdds[1]) {
                    return resultOdds[odds[i]];
                }
        }

        throw Error("Dice roll could not be determined.");
    }
}

export class Pitcher extends Player {

    readonly pitcherType: string[];
    readonly batterType: number;
    
    constructor(_nameFirst: string, _nameLast: string, _fielding: {[position: string]: number}, _pitcherType: string[], _batterType: number, _ratings: {[rollOdds: string]: IBattedResult}[][]) {
        super(_nameFirst, _nameLast, _fielding, _ratings)
        this.pitcherType = _pitcherType;
        this.batterType = _batterType
    }
}

export class Hitter extends Player {

    readonly stealing: number;
    readonly running: {min: number, max: number};

    constructor(_nameFirst: string, _nameLast: string, _fielding: {[position: string]: number}, _stealing: number, _running: {min: number, max: number}, _ratings: {[rollOdds: string]: IBattedResult}[][]) {
        super(_nameFirst, _nameLast, _fielding, _ratings)
        this.stealing = _stealing;
        this.running = _running;
    }
}