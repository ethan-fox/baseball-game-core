import { Hitter, Pitcher, BasePath } from "../core";
import { randomNumber } from "../helpers"
import { gameConfig, CHART_PARAMS, PLAY_RESULTS, POSITIONS } from "../config"
import { IBattedResult } from "../core/models/BattedResult";
import { logger } from "../config";
import * as _ from "lodash";

export class GameManager {

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

    private currentInning: number;
    private finalRegulationInning: number;
    
    private outs: number;
    private topOfInning: boolean;

    private basePath: BasePath;

    private currPitcher: Pitcher;
    private currLineup: Hitter[];
    private currBatter: Hitter;
    private currHomeLineupPos = 0;
    private currAwayLineupPos = 0;

    constructor(_homeSP: Pitcher, _homeLineup: Hitter[], _awaySP: Pitcher, _awayLineup: Hitter[]) {

        // Starting lineups
        this.homeSP = _homeSP;
        this.homeLineup = _homeLineup;

        this.awaySP = _awaySP;
        this.awayLineup = _awayLineup;
        
        // Length of game
        this.currentInning = 1;
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

        this.currPitcher = this.homeSP;

        this.currBatter = this.awayLineup[this.currAwayLineupPos];

        console.log("GAME START");
    }

    executePlay(): boolean {

        if (!this.isGameOver()) {

            // logger.debug("CURRENT AT-BAT")
            logger.info("--------------------------------");
            logger.info(`${(this.topOfInning)?"TOP":"BOTTOM"} INNING ${this.currentInning}`); // FUN WITH TERNARIES!!
            logger.debug(`${this.outs} OUT${(this.outs != 1)?"S":""}`);
            // logger.debug(`HOME TEAM: ${this.homeRuns} AWAY TEAM: ${this.awayRuns}`);


            logger.debug(`PITCHER: ${this.currPitcher.fullName}`);
            logger.debug(`HITTER: ${this.currBatter.fullName}`);

            const advantage = randomNumber(0, 1);
            const x = randomNumber(0, 2);
            const y = randomNumber(0, 10);
    
            let result: IBattedResult; // Determine player advantage
            if (advantage == 0) { // Batter
                result = this.currBatter.getPlayResult(x, y);
            } else { // Pitcher
                result = this.currPitcher.getPlayResult(x, y);
            }

            logger.info(`RESULT: ${result.result}`);

            try { // TODO: Determine outcome from result FIXME: Always force out for now
                this.incrementOuts();
                this.incrementLineupIndex();

                switch (result.result) {
                    case PLAY_RESULTS.SINGLE:
                        this.basePath.advanceAllRunners(this.currBatter)

                        break;
                }

                
            } catch { // If half-inning is over
                logger.info("HALF-INNING OVER")
                this.flipInning()
            }

            return true;
        } else {
            return false;
        }

        logger.info("GAME OVER!");
        logger.info(`AWAY TEAM: ${this.awayRuns} HOME TEAM: ${this.homeRuns}`);

        this.printScoreBoard();
    }

    get homeRuns(): number {
        return this.homeRunsByInning.reduce((acc, curr) => acc += curr, 0);
    }

    get awayRuns(): number {
        return this.awayRunsByInning.reduce((acc, curr) => acc += curr, 0);
    }

    printScoreBoard(): void {
        logger.debug("\nSCOREBOARD:");
        logger.debug([..._.range(1, this.currentInning+1), "|", "R", "H", "E"].join(" "));
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
        if (!this.topOfInning) { // If bottom of inning
            this.currentInning++; // Increment the inning
            if (this.currentInning >= this.finalRegulationInning) { // If we're in extras need to bump the scoreboard/array
                this.homeRunsByInning.push()
                this.awayRunsByInning.push()
            }
        }
        this.topOfInning = !this.topOfInning; // Flip to other half
        this.outs = 0; // Reset outs
    }

    private isGameOver(): boolean {

        return (this.homeRuns > this.awayRuns) // If the home team is winning ...
            ? (!this.topOfInning) // ... in the bottom of ...
                ? (this.currentInning >= this.finalRegulationInning) // ... the last inning or later ...
                    ? true // ... the game is over.
                    : false
                : false
            : (this.awayRuns > this.homeRuns) // If the away team is winning ...
                ? (this.topOfInning) // ... in the top of ...
                    ? (this.currentInning > this.finalRegulationInning) // ... the first extra inning or later ...
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


}

