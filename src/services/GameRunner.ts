import { Hitter, Pitcher, BasePath } from "../core";
import { randomNumber } from "../helpers"
import { gameConfig, CHART_PARAMS, PLAY_RESULTS, POSITIONS } from "../config"
import { IBattedResult } from "../models";
import { logger } from "../config";
import * as _ from "lodash";

export class GameRunner {

    private gameStarted: boolean;

    private homeSP: Pitcher;
    private homeLineup: Hitter[];
    private homeRunsByInning: number[];
    private homeHits: number;
    private homeErrors: number;
    private homeLOB: number;

    private awaySP: Pitcher;
    private awayLineup: Hitter[];
    private awayRunsByInning: number[];
    private awayHits: number;
    private awayErrors: number;
    private awayLOB: number;

    private currInning: number;
    private finalRegulationInning: number;
    
    private outs: number;
    private topOfInning: boolean;

    private basePath: BasePath;

    // private currPitcher: Pitcher;
    // private currLineup: Hitter[];
    // private currBatter: Hitter;
    private currHomeLineupPos = 0;
    private currAwayLineupPos = 0;

    get currPitcher(): Pitcher {
        return this.topOfInning ? this.homeSP : this.awaySP;
    }

    get currBatter(): Hitter {
        return this.topOfInning
            ? this.awayLineup[this.currAwayLineupPos]
            : this.homeLineup[this.currHomeLineupPos];
    }

    constructor(_homeSP: Pitcher, _homeLineup: Hitter[], _awaySP: Pitcher, _awayLineup: Hitter[]) {

        // Starting lineups
        this.homeSP = _homeSP;
        this.homeLineup = _homeLineup;

        this.awaySP = _awaySP;
        this.awayLineup = _awayLineup;
        
        // Length of game
        this.currInning = 1;
        this.finalRegulationInning = gameConfig.INNINGS;
        this.outs = 0;
        this.topOfInning = true;
        
        // Basic scoreboard stats
        this.homeRunsByInning = _.range(0, gameConfig.INNINGS, 0);
        this.homeHits = 0;
        this.homeErrors = 0;
        this.homeLOB = 0;
    
        this.awayRunsByInning = _.range(0, gameConfig.INNINGS, 0);
        this.awayHits = 0;
        this.awayErrors = 0;
        this.awayLOB = 0;
        
        this.currHomeLineupPos = 0;
        this.currAwayLineupPos = 0;

        this.gameStarted = false;
    }

    start(): void {

        this.initLineups();

        this.basePath = new BasePath();

        console.log("GAME START");
    }

    executePlay(): boolean {

        if (!this.isGameOver()) {

            // logger.debug("CURRENT AT-BAT")
            logger.info("--------------------------------");
            logger.info(`${(this.topOfInning)?"TOP":"BOTTOM"} INNING ${this.currInning}`); // FUN WITH TERNARIES!!
            logger.debug(`${this.outs} OUT${(this.outs != 1)?"S":""}`);
            // logger.debug(`HOME TEAM: ${this.homeRuns} AWAY TEAM: ${this.awayRuns}`);

            // this.currPitcher = this.homeSP;

            // this.currBatter = this.awayLineup[this.currAwayLineupPos];

            logger.debug(`PITCHER: ${this.currPitcher.fullName}`);
            logger.debug(`HITTER: ${this.currBatter.fullName}`);

            const advantage = randomNumber(0, 1);
            const x = randomNumber(0, 2);
            const y = randomNumber(0, 10);
    
            const result = (advantage == 0) // Determine player advantage
                            ? this.currBatter.getPlayResult(x, y) // Batter
                            : this.currPitcher.getPlayResult(x, y); // Pitcher

            try { // TODO: Determine outcome from result
                this.incrementLineupIndex();

                logger.info(`RESULT: ${result.result}`);

                const runsScored = this.processResult(result);

                this.addRunsForHalfInning(runsScored);

                this.basePath.printBases();

            } catch { // If half-inning is over
                logger.info("HALF-INNING OVER")
                this.flipInning();
                this.printScoreBoard();
            }


            // this.currBatter = this.homeLineup(this.)
            return true;
        } else {
            return false;
        }
    }

    get homeRuns(): number {
        return this.homeRunsByInning.reduce((acc, curr) => acc += curr, 0);
    }

    get awayRuns(): number {
        return this.awayRunsByInning.reduce((acc, curr) => acc += curr, 0);
    }

    printScoreBoard(): void {
        logger.debug("\nSCOREBOARD:");
        logger.debug([..._.range(1, this.currInning+1), "|", "R", "H", "E"].join(" "));
        logger.debug([...this.awayRunsByInning, "|", this.awayRuns, this.awayHits, this.awayErrors].join(" "));
        logger.debug([...this.homeRunsByInning, "|", this.homeRuns, this.homeHits, this.homeErrors].join(" "));
    }

    private initLineups() {

        if (!this.gameStarted) {
            this.homeSP.putIntoGame();
            this.awaySP.putIntoGame();

            this.homeLineup.forEach(player => player.putIntoGame());
            this.awayLineup.forEach(player => player.putIntoGame());

            logger.info("Play Ball!");
            this.gameStarted = !this.gameStarted;
        }
    }

    private flipInning() {
        const numLOB = this.basePath.clearBases();
        if (!this.topOfInning) { // If bottom of inning
            this.homeLOB += numLOB;
            this.currInning++; // Increment the inning
            if (this.currInning >= this.finalRegulationInning) { // If we're in extras need to bump the scoreboard/array
                this.homeRunsByInning.push()
                this.awayRunsByInning.push()
            }
        } else {
            this.awayLOB += numLOB;
        }
        this.topOfInning = !this.topOfInning; // Flip to other half
        this.outs = 0; // Reset outs
    }

    private isGameOver(): boolean {

        return (this.homeRuns > this.awayRuns) // If the home team is winning ...
            ? (!this.topOfInning) // ... in the bottom of ...
                ? (this.currInning >= this.finalRegulationInning) // ... the last inning or later ...
                    ? true // ... the game is over.
                    : false
                : false
            : (this.awayRuns > this.homeRuns) // If the away team is winning ...
                ? (this.topOfInning) // ... in the top of ...
                    ? (this.currInning > this.finalRegulationInning) // ... the first extra inning or later ...
                        ? true // ... the game is over.
                        : false
                    : false
                : false;
    }

    private incrementOuts() {
        this.outs++;
        if (this.outs == 3) throw Error();
    }

    private incrementLineupIndex() {
        if (this.topOfInning) {
            this.currAwayLineupPos++;
            if (this.currAwayLineupPos >= this.awayLineup.length)
               this.currAwayLineupPos = 0;
        } else {
            this.currHomeLineupPos++;
            if (this.currHomeLineupPos >= this.homeLineup.length)
               this.currHomeLineupPos = 0;
        }
    }

    private addRunsForHalfInning(runs: number) {
        this.topOfInning
            ? this.awayRunsByInning[this.currInning] += runs
            : this.homeRunsByInning[this.currInning] += runs
    }

    private processResult(result: IBattedResult): number {
        let runsScoredOnPlay = 0;

        // TODO: Additional effects (*, **, +, etc...)

        switch (result.result) {
            // Reach base safely
            case PLAY_RESULTS.SINGLE:
                runsScoredOnPlay += this.basePath.advanceAllRunners(this.currBatter);
                break;
            case PLAY_RESULTS.DOUBLE:
                runsScoredOnPlay += this.basePath.advanceAllRunners(this.currBatter);
                runsScoredOnPlay += this.basePath.advanceAllRunners();
                break;
            case PLAY_RESULTS.TRIPLE:
                runsScoredOnPlay += this.basePath.advanceAllRunners(this.currBatter);
                runsScoredOnPlay += this.basePath.advanceAllRunners();
                runsScoredOnPlay += this.basePath.advanceAllRunners();
                break;
            case PLAY_RESULTS.HOMERUN:
                runsScoredOnPlay += this.basePath.advanceAllRunners(this.currBatter);
                runsScoredOnPlay += this.basePath.advanceAllRunners();
                runsScoredOnPlay += this.basePath.advanceAllRunners();
                runsScoredOnPlay += this.basePath.advanceAllRunners();
                break;
            case PLAY_RESULTS.WALK:
                runsScoredOnPlay += this.basePath.advanceAllRunners(this.currBatter);
                break;
            // Outs
            case PLAY_RESULTS.GROUNDBALL:
                this.incrementOuts();
                runsScoredOnPlay += this.basePath.advanceAllRunners();
                // TODO: Chartparams
                break;
            case PLAY_RESULTS.FLYBALL:
                this.incrementOuts();
                // TODO: Chartparams
                break;
            case PLAY_RESULTS.LINEOUT:
                this.incrementOuts();
                break;
            case PLAY_RESULTS.STRIKEOUT:
                this.incrementOuts();
                break;
        }

        return runsScoredOnPlay;
    }

}

