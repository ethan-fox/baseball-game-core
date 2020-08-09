import { hitters, pitchers } from './config/constants'
import { logger } from './config'
import { Pitcher, Game, Hitter } from './core'
import * as _ from 'lodash';

export function sampleGameSetup() : Game {

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
        sampleBatter.fielding,
        sampleBatter.stealing,
        sampleBatter.running,
        sampleBatter.batting
    );

    return new Game(pitcher, _.range(9).map(() => batter), pitcher, _.range(9).map(() => batter))

    // openingDay.start();
    
    // while (!openingDay.isGameOver) {
    //     openingDay.executePlay();
    // }

    // logger.info('GAME OVER!');
    // // logger.info(`AWAY TEAM: ${openingDay.awayRuns} HOME TEAM: ${openingDay.homeRuns}`);

    // openingDay.printScoreBoard();
}