import { hitters, pitchers } from "./config/constants"
import { logger } from "./config"
import { Pitcher, Hitter } from "./core"
import { GameRunner } from "./services";
import * as _ from 'lodash';

function playGame() {

    const samplePitcher = pitchers.NYY_P_001;
    const sampleBatter = hitters.NYY_H_001;
    
    const pitcher = new Pitcher(
        samplePitcher.nameFirst,
        samplePitcher.nameLast,
        samplePitcher.fielding,
        samplePitcher.pitcherType,
        samplePitcher.batterType,
        samplePitcher.pitching
    );

    const batter = new Hitter(
        sampleBatter.nameFirst,
        sampleBatter.nameLast,
        samplePitcher.fielding,
        sampleBatter.stealing,
        sampleBatter.running,
        sampleBatter.batting
    );

    const openingDay = new GameRunner(pitcher, _.range(9).map(() => batter), pitcher, _.range(9).map(() => batter))

    openingDay.start();
    
    while (true) {
        const flag = openingDay.executePlay();
        if (!flag) break;
    }

    logger.info("GAME OVER!");
    logger.info(`AWAY TEAM: ${this.awayRuns} HOME TEAM: ${this.homeRuns}`);

    this.printScoreBoard();
    return false;



    return
}

playGame()