import { hitters, pitchers } from "./config/constants"
import { Pitcher, Hitter } from "./core"
import * as _ from 'lodash';
import { Game } from "./core";

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

    const openingDay = new Game(pitcher, _.range(9).map(() => batter), pitcher, _.range(9).map(() => batter))

    openingDay.start();

    return
}

playGame()