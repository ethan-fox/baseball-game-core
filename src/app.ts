import * as express from 'express';
import * as bodyParser from 'body-parser'
import { logger } from './config'
import { sampleGameSetup } from './index'

// Express setup
const app = express();
const game = sampleGameSetup();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text()); // for parsing plain text (in this app: markdown)
app.use(function (req, res, next) { // this is the only way to fix the CORS issue :(
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', function (req, res) {
    res.status(200).send({ 'message': 'Ping!' })
})

app.post('/startGame', function (req, res) {

    game.start()

    res.status(201).send({ 'message': 'Game started!' });
})

app.post('/executePlay', function (req, res) {

    if (!game.isGameOver) {
        const play = game.executePlay()
    
        res.status(200).send({ 'playResult': play });
    } else {
        res.status(400).send({
            'error': 'Game is over!',
            'HOME': game.homeRuns,
            'AWAY': game.awayRuns
        });
    }

});

const listen_port = 7050;

app.listen(listen_port, async function () {
    logger.info('FBS backend listening on port', listen_port);
});
