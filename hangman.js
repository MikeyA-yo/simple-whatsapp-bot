const { randomInt } = require("./economy");
const Game = require("./hangengingine");
async function words() {
  const res = await fetch("https://random-word-api.herokuapp.com/all");
  const data = await res.json();
  return data;
}

async function guessWord() {
  const int = randomInt(0, 178187);
  const word = (await words())[int];
  return word;
}

async function start(m){
    m.reply(`You are about to start a guessing Game.`);
    let word = await guessWord();
    const game = new Game(word, {
        concealCharacter: '*',
        maxAttempt: 6
      })
      
      return game;
}