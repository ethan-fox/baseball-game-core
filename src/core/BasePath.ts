import { Hitter } from './Player';
import { BASE_ASCII } from '../config/constants';

export class BasePath {

    private firstBase: Hitter;
    private secondBase: Hitter;
    private thirdBase: Hitter;

    constructor() {
        this.firstBase = undefined;
        this.secondBase = undefined;
        this.thirdBase = undefined;
    }

    get runners(): Hitter[] {
        return [this.firstBase, this.secondBase, this.thirdBase]
    }

    // Needs to be it's own logic because it isn't a force
    walkBatter(newRunner: Hitter): number  {
        let runsScored = 0;

        if (!this.firstBase) {
            this.firstBase = newRunner;
        } else if (!this.secondBase) {
            this.secondBase = this.firstBase;
            this.firstBase = newRunner;
        } else if (!this.thirdBase) {
            this.thirdBase = this.secondBase;
            this.secondBase = this.firstBase;
            this.firstBase = newRunner;
        } else {
            runsScored = this.advanceAllRunners(newRunner);
        }

        return runsScored;
    }

    // Will return number of runners that advanced from third (i.e Runs Scored)
    advanceAllRunners(newRunner?: Hitter): number {
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

    advanceRunnersFromSecond(): number {
        let runsScored = 0;

        if (this.thirdBase) {
            this.thirdBase = undefined;
            runsScored++;
        }

        if (this.secondBase) {
            this.thirdBase = this.secondBase;
            this.secondBase = undefined;
        }

        return runsScored;
    }

    advanceRunnersFromThird(): number {
        let runsScored = 0;

        if (this.thirdBase) {
            this.thirdBase = undefined;
            runsScored++;
        }

        return runsScored;
    }

    clearBases(): number {
        const runnersLOB = this.runners.filter(runnerOn => runnerOn !== undefined).length

        this.firstBase = undefined;
        this.secondBase = undefined;
        this.thirdBase = undefined;

        return runnersLOB;
    }

    // Tiny basepath visualizer TODO: More animation .. literally lowest priority
    printBases(): void {
        const fB = (this.firstBase)? BASE_ASCII.MAN_ON : BASE_ASCII.EMPTY;
        const sB = (this.secondBase)? BASE_ASCII.MAN_ON : BASE_ASCII.EMPTY;
        const tB = (this.thirdBase)? BASE_ASCII.MAN_ON : BASE_ASCII.EMPTY;

        console.log(`  ${sB}  `);
        console.log(`${tB}   ${fB}`);
    }
}