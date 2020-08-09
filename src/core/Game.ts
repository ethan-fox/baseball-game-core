import { Hitter, Pitcher, BasePath } from '../core';
import { randomNumber } from '../helpers'
import { gameConfig, CHART_PARAMS, PLAY_RESULTS, POSITIONS } from '../config'
import { IBattedResult, IPlayResult } from '../models';
import { logger } from '../config';
import * as _ from 'lodash';

export class Game {

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
    
    private outs: number;
    private topOfInning: boolean;

    private basePath: BasePath;

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

    get isGameOver(): boolean {

        return (this.currInning+1 > gameConfig.INNINGS)

        // return (this.homeRuns > this.awayRuns) // If the home team is winning ...
        //     ? (!this.topOfInning) // ... in the bottom of ...
        //         ? (this.currInning >= this.finalRegulationInning) // ... the last inning or later ...
        //             ? true // ... the game is over.
        //             : false
        //         : false
        //     : (this.awayRuns > this.homeRuns) // If the away team is winning ...
        //         ? (this.topOfInning) // ... in the top of ...
        //             ? (this.currInning > this.finalRegulationInning) // ... the first extra inning or later ...
        //                 ? true // ... the game is over.
        //                 : false
        //             : false
        //         : false;
    }

    get homeRuns(): number {
        return this.homeRunsByInning.reduce((a, c) => a+=c, 0);
    }

    get awayRuns(): number {
        return this.awayRunsByInning.reduce((a, c) => a+=c, 0);
    }

    constructor(_homeSP: Pitcher, _homeLineup: Hitter[], _awaySP: Pitcher, _awayLineup: Hitter[]) {

        // Starting lineups
        this.homeSP = _homeSP;
        this.homeLineup = _homeLineup;

        this.awaySP = _awaySP;
        this.awayLineup = _awayLineup;
        
        // Length of game
        this.currInning = 0;
        this.outs = 0;
        this.topOfInning = true;
        
        // Basic scoreboard stats
        this.homeRunsByInning = [0];
        this.homeHits = 0;
        this.homeErrors = 0;
        this.homeLOB = 0;
    
        this.awayRunsByInning = [0];
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

        console.log('GAME START');
    }

    executePlay(): boolean {

        if (!this.isGameOver) {

            // logger.debug('CURRENT AT-BAT')
            logger.info('--------------------------------');
            logger.info(`${(this.topOfInning)?'TOP':'BOTTOM'} INNING ${this.currInning+1}`); // FUN WITH TERNARIES!!
            logger.debug(`${this.outs} OUT${(this.outs != 1)?'S':''}`);

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

            try { // Determine outcome from result
                this.incrementLineupIndex();

                logger.info(`RESULT: ${result.result}`);

                const playResult = this.processResult(result);

                this.addRunsForHalfInning(playResult.runsScored);
                if (playResult.hit) this.addHitForHalfInning()

                this.basePath.printBases();

            } catch { // If half-inning is over
                logger.info('HALF-INNING OVER')
                this.flipInning();
                const away = this.awayRuns
                const home = this.homeRuns
                logger.debug(`HOME TEAM: ${home} AWAY TEAM: ${away}`);

            }

            return true;
        } else {
            return false;
        }
    }

    printScoreBoard(): void {
        logger.debug('\nSCOREBOARD:');
        logger.debug([..._.range(1, gameConfig.INNINGS+1), '|', 'R', 'H', 'E'].join(' '));
        logger.debug([...this.awayRunsByInning, '|', this.awayRuns, this.awayHits, this.awayErrors].join(' '));
        logger.debug([...this.homeRunsByInning, '|', this.homeRuns, this.homeHits, this.homeErrors].join(' '));
    }

    private initLineups() {

        if (!this.gameStarted) {
            this.homeSP.putIntoGame();
            this.awaySP.putIntoGame();

            this.homeLineup.forEach(player => player.putIntoGame());
            this.awayLineup.forEach(player => player.putIntoGame());

            logger.info('Play Ball!');
            this.gameStarted = !this.gameStarted;
        }
    }

    private flipInning() {
        const numLOB = this.basePath.clearBases();
        if (!this.topOfInning) { // If bottom of inning
            this.homeLOB += numLOB;
            this.currInning++; // Increment the inning
            if (!this.isGameOver) {
                this.homeRunsByInning.push(0)
                this.awayRunsByInning.push(0)
            } 
        } else {
            this.awayLOB += numLOB;
        }
        this.topOfInning = !this.topOfInning; // Flip to other half
        this.outs = 0; // Reset outs
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
        if (runs > 0){
            logger.silly(`${runs} runs scored!`)
        }
        if (this.topOfInning) {
            this.awayRunsByInning[this.currInning] += runs;
        } else {
            this.homeRunsByInning[this.currInning] += runs;
        }
    }

    private addHitForHalfInning() {
        if (this.topOfInning) {
            this.awayHits++;
        } else {
            this.homeHits++;
        }
    }

    private processResult(result: IBattedResult): IPlayResult {
        let runsScored = 0;
        let hit = false;

        // TODO: Additional effects (*, **, +, etc...)

        switch (result.result) {
            // Reach base safely
            case PLAY_RESULTS.SINGLE:
                runsScored += this.basePath.advanceAllRunners(this.currBatter);
                hit = true;
                break;
            case PLAY_RESULTS.DOUBLE:
                runsScored += this.basePath.advanceAllRunners(this.currBatter);
                runsScored += this.basePath.advanceAllRunners();
                hit = true;
                break;
            case PLAY_RESULTS.TRIPLE:
                runsScored += this.basePath.advanceAllRunners(this.currBatter);
                runsScored += this.basePath.advanceAllRunners();
                runsScored += this.basePath.advanceAllRunners();
                hit = true;
                break;
            case PLAY_RESULTS.HOMERUN:
                runsScored += this.basePath.advanceAllRunners(this.currBatter);
                runsScored += this.basePath.advanceAllRunners();
                runsScored += this.basePath.advanceAllRunners();
                runsScored += this.basePath.advanceAllRunners();
                hit = true;
                break;
            case PLAY_RESULTS.WALK:
                runsScored += this.basePath.walkBatter(this.currBatter);
                break;
            // Outs
            case PLAY_RESULTS.GROUNDBALL:
                this.incrementOuts();
                runsScored += this.basePath.advanceAllRunners();
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
            case PLAY_RESULTS.CATCHERS:
                this.incrementOuts();
                break;
        }

        return { runsScored, hit };
    }

}

