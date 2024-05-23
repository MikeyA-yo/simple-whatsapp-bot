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

async function startHangman(m){
    m.reply(`You are about to start a guessing Game.`);
    let word = await guessWord();
    const game = new Game(word, {
        concealCharacter: '_',
        maxAttempt: 12
      })
      
      return game;
}
async function guess(m, guess, game){
    
   if(game.status == 'IN_PROGRESS'){
    game.guess(guess);
    m.reply(game.hiddenWord.join(""));
    if(!game.hiddenWord.join("").includes('_')) m.reply('You Won')
    return game;
   }else if(game.status == 'WON'){
    m.reply(`You have won`)
   }
   else{
    m.reply('no game in progress/ or you lost i am tired of adding conditionals')
   }
}
module.exports = {startHangman, guess}