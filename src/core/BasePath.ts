import { Hitter } from "./Player";


export class BasePath {

    private firstBase: Hitter;
    private secondBase: Hitter;
    private thirdBase: Hitter;

    constructor() {
        this.firstBase = undefined;
        this.secondBase = undefined;
        this.thirdBase = undefined;
    }

    // Will return number of runners that advanced from third
    advanceAllRunners(newRunner: Hitter): number {
        let runsScored = 0;

        if (this.thirdBase) {
            this.thirdBase = undefined;
            runsScored++;
        }

        if (this.secondBase) {
            this.thirdBase = this.secondBase;
            this.secondBase = undefined;
        }

        if (this.firstBase) {
            this.secondBase = this.firstBase;
            this.firstBase = undefined;
        }

        if (newRunner) {
            this.firstBase = newRunner;
        }

        return runsScored;
    }
}