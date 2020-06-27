import { Hitter } from "./Player";
import { BASE } from "../config/constants";
import { first } from "lodash";

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
        const fB = (this.firstBase)? BASE.MAN_ON : BASE.EMPTY;
        const sB = (this.secondBase)? BASE.MAN_ON : BASE.EMPTY;
        const tB = (this.thirdBase)? BASE.MAN_ON : BASE.EMPTY;

        console.log(`  ${sB}  `);
        console.log(`${tB}   ${fB}`);
    }
}