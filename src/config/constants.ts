export const hitters = {
    NYY_H_001: {
        nameFirst: 'DJ',
        nameLast: 'LeMahieu',
        fielding: {
            '4': 1,
            '5': 2,
            '3': 2
        },
        stealing: 4,
        running: {
            min: 1,
            max: 14
        },
        batting: [
            [{
                '1_20': {
                    playResult: 'LINE',
                    position: '4',
                    effect: 'DEATH'
                }
            }, {

                '1_20': {
                    playResult: 'BB'
                }
            }, {

                '1_20': {
                    playResult: 'HR'
                }
            }, {

                '1_8': {
                    playResult: 'HR'
                },
                '9_20': {
                    playResult: '2B'
                }
            }, {  // I hope this becomes a spreadsheet soon...
                '1_12': {
                    playResult: '2B',
                    effect: '**'
                },
                '13_20': {
                    playResult: '1B',
                    effect: '**'
                }
            }, {

                '1_20': {
                    playResult: '1B'
                }
            }, {
                '1_20': {
                    playResult: '1B'
                }
            }, {
                '1_20': {
                    playResult: 'FLY',
                    position: '6'
                }
            }, {
                '1_20': {
                    playResult: '1B',
                    effect: '**'
                }
            }, {
                '1_20': {
                    playResult: '1B',
                    effect: '**'
                }
            }, {
                '1_20': {
                    playResult: 'LINE',
                    effect: 'INJ'
                }
            }],
            [{
                '1_20': {
                    playResult: 'FLY',
                    position: '6'
                }
            }, {
                '1_20': {
                    playResult: 'LINE',
                    position: '5'
                }
            }, {
                '1_20': {
                    playResult: 'LINE',
                    position: '5'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '6',
                    chartParam: 'A',
                    effect: '++'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '5',
                    chartParam: 'A'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '5',
                    chartParam: 'A'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '6',
                    chartParam: 'A'
                }
            }, {
                '1_20': {
                    playResult: 'FLY',
                    position: '8',
                    chartParam: 'B'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '1',
                    chartParam: 'B'
                }
            }, {
                '1_20': {
                    playResult: 'FLY',
                    position: '4'
                }
            }, {
                '1_20': {
                    playResult: 'FOULTIP',
                    position: '2'
                }
            }],
            [{
                '1_20': {
                    playResult: 'GROUND',
                    position: '5',
                    chartParam: 'B'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '4',
                    chartParam: 'B'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '6',
                    chartParam: 'A'
                }
            }, {
                '1_20': {
                    playResult: '1B',
                    effect: '*'
                }
            }, {
                '1_20': {
                    playResult: '1B',
                    effect: '**'
                }
            }, {
                '1_20': {
                    playResult: 'FLY',
                    position: '7',
                    chartParam: 'B'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'BB'
                }
            }, {
                '1_16': {
                    playResult: '1B',
                    effect: '*'
                },
                '17_20': {
                    playResult: 'LINE',
                    position: '5'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '6',
                    chartParam: 'A',
                    effect: '++'
                }
            }, {
                '1_20': {
                    playResult: 'FLY',
                    position: '8',
                    chartParam: 'B'
                }
            }]
        ]
    }
}

export const pitchers = {
    NYY_P_001: {
        nameFirst: 'Gerrit',
        nameLast: 'Cole',
        pitcherType: ['S'],
        fielding: {
            '1': 4
        },
        batterType: 1,
        pitching: [
            [{
                '1_20': {
                    playResult: 'FLY',
                    position: '8',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'FLY',
                    position: '9',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '6',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_18': {
                    playResult: 'HR'
                },
                '19_20': {
                    playResult: '2B'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '5',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '3',
                    chartParam: 'C'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }],
            [{
                '1_20': {
                    playResult: 'BB'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '1',
                    chartParam: 'X'
                }
            }, {
                '1_17': {
                    playResult: '2B'
                },
                '18_20': {
                    playResult: 'FLY',
                    position: '8',
                    chartParam: 'B'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '4',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'BB'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '3',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }],
            [{
                '1_20': {
                    playResult: 'GROUND',
                    position: '4',
                    chartParam: 'X'
                } 
            }, {
                '1_20': {
                    playResult: 'FLY',
                    position: '7',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'CATCHER\'S CARD',
                    position: '2',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_20': {
                    playResult: 'K'
                }
            }, {
                '1_11': {
                    playResult: '1B',
                    effect: '*'
                },
                '12_20': {
                    playResult: 'GROUND',
                    position: '4',
                    chartParam: 'C'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '6',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'FLY',
                    position: '8',
                    chartParam: 'X'
                }
            }, {
                '1_20': {
                    playResult: 'GROUND',
                    position: '6',
                    chartParam: 'X'
                }
            }]
        ]
    }
}

export const enum POSITIONS {
    PITCHER = '1',
    CATCHER =  '2',
    FIRST_BASE = '3',
    SECOND_BASE = '4',
    THIRD_BASE = '5',
    SHORTSTOP = '6',
    LEFT_FIELD = '7',
    CENTER_FIELD = '8',
    RIGHT_FIELD = '9'
}

export const enum PLAY_RESULTS {
    GROUNDBALL = 'GROUND',
    FLYBALL = 'FLY',
    LINEOUT = 'LINE',
    STRIKEOUT = 'K',
    CATCHERS = 'CATCHER\'S CARD',
    WALK = 'BB',
    SINGLE = '1B',
    DOUBLE = '2B',
    TRIPLE = '3B',
    HOMERUN = 'HR'
}

// I need a way to resolve all hits to a list to check play type .. i don't like this.
export const HIT_TYPES : string[] = [
    PLAY_RESULTS.SINGLE,
    PLAY_RESULTS.DOUBLE,
    PLAY_RESULTS.TRIPLE,
    PLAY_RESULTS.HOMERUN
]

export const enum CHART_PARAMS {
    A = 'A',
    B = 'B',
    C = 'C',
    X = 'X'
}

export const enum BASE_ASCII {
    MAN_ON = '\u25C8',
    EMPTY = '\u25C7'
}