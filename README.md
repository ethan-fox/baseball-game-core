# baseball-game-core

Play a baseball game, if every pitcher was Gerrit Cole and every hitter was DJ LeMahieu (my ideal team TBH)

Should be hosted in it's own app to receive remote traffic:

```sh
$ npm run dev
```

and then `POST localhost:7050/executePlay` (via Postman or somewhere else)

## TODO list

* Load in more players. This will be tedious if done manually. Thinking of a cool ML/OCR solution where we load in images of Strat-o-matic cards, and pull their stats in.
* Remote client interface - so people can play from their own machine. Could be a CLI or UI. But I'm not good at web dev.
    * Event listeners??
* Better animations
* Tests? lol
