import { IResult } from "./models/Result"
import { randomNumber } from "../helpers/RandomNumber"

class Player {

    private nameFirst: string;
    private nameLast: string;
    private fielding: {[key: string]: number};
    private ratings: {[key: string]: IResult}[][];


    constructor(_nameFirst: string, _nameLast: string, _fielding: {[position: string]: number}, _ratings: {[rollOdds: string]: IResult}[][]) {
        this.nameFirst = _nameFirst;
        this.nameLast = _nameLast;
        this.fielding = _fielding;
        this.ratings = _ratings;
    }

    get fullName() {
        return `${this.nameFirst} ${this.nameLast}`;
    }

    getFielderRating(position: string): number {
        return this.fielding[position];
    }

    getPlayResult(colIndex: number, rowIndex: number): IResult {
        const resultOdds = this.ratings[colIndex][rowIndex];

        const playResult = randomNumber(1, 20);

        Object.keys(resultOdds).forEach(odd => {
            const parsedOdds = odd.split("_").map(limit => Number(limit));

            if (playResult >= parsedOdds[0] &&
                playResult <= parsedOdds[1]) {
                    return resultOdds[odd]
                }
        });

        throw Error("Dice roll could not be determined.");
    }
}

export class Pitcher extends Player {

    private pitcherType: string[];
    private batterType: number;
    
    constructor(_nameFirst: string, _nameLast: string, _fielding: {[position: string]: number}, _pitcherType: string[], _batterType: number, _ratings: {[rollOdds: string]: IResult}[][]) {
        super(_nameFirst, _nameLast, _fielding, _ratings)
        this.pitcherType = _pitcherType;
        this.batterType = _batterType
    }
}

export class Batter extends Player {

    private stealing: number;
    private running: {min: number, max: number};

    constructor(_nameFirst: string, _nameLast: string, _fielding: {[position: string]: number}, _stealing: number, _running: {min: number, max: number}, _ratings: {[rollOdds: string]: IResult}[][]) {
        super(_nameFirst, _nameLast, _fielding, _ratings)
        this.stealing = _stealing;
        this.running = _running;
    }
}