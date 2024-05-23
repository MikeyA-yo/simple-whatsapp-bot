function start() {
  const game = require("./ttt").Game;
  return new game();
}
let game = start();
let moves = [];
let i = 1;
async function coreGame(p1, p2, m, m1, m2, game) {
  const numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
  const chat = await m.getChat();
  let text = ``;
  let j = 0;
  numbers.forEach((no) => {
    if (j == 3) {
      text += `\n`;
      j = 0;
    }
    text += `|${no}|`;
    j++;
  });
  do {
    //  game = start();
    m.reply(text);
  } while (i != 1);
  if (game.isFinished()) {
    if (game.winner == "O") {
      chat.sendMessage(`@${p2} won this round`,{
        mentions: [`${p2}@c.us`],
      });
      return true;
    } else if (game.winner == "X") {
      chat.sendMessage(`@${p1} won this round`, {
        mentions: [`${p1}@c.us`],
      });
      return true;
    } else {
      m.reply(`draw ig`);
      return true;
    }
  }
  function finish(){
    if (game.isFinished()) {
      if (game.winner == "O") {
        chat.sendMessage(`@${p2} won this round`,{
          mentions: [`${p2}@c.us`],
        });
        return true;
      } else if (game.winner == "X") {
        chat.sendMessage(`@${p1} won this round`, {
          mentions: [`${p1}@c.us`],
        });
        return true;
      } else {
        m.reply(`draw ig`);
        return true;
      }
    }
  }
  // while(!currentGame.isFinished){
  if (!isNaN(m1) && m1 >= 1) {
    game.move("x", m1);
    moves.push(game.toString());
    if (game.isFinished()){
      return finish()
    }
   chat.sendMessage(`${game.toString()}\n\n your turn @${p2}`, {
      mentions: [`${p2}@c.us`],
    });
  }
  if (!isNaN(m2) && m2 >= 1) {
    game.move("o", m2);
    moves.push(game.toString());
    if (game.isFinished()){
      return finish()
    }
    chat.sendMessage(`${game.toString()}\n\n your turn @${p1}`, {
      mentions: [`${p1}@c.us`],
    });
  }
  //}

}
function movesB() {
  return moves;
}

module.exports = { game, movesB, start, coreGame };
