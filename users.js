const fs = require("fs");
const db = JSON.parse(fs.readFileSync("usersdb.json"));
const ranks = [
  "noobie",
  "novice",
  "rookie",
  "citizen",
  "talented",
  "skilled",
  "apprehentice",
  "intermediate",
  "seasoned",
  "proficient",
  "expert",
  "expert pro",
  "advanced",
  'senior',
  "professor",
  "mastery",
  "elite",
  "legend wannabe",
  "legend air",
  "legend",
  "icon wannabe",
  "icon air",
  "icon",
  "mikey",
];
class userScheme {
  constructor(uname, uid, uexp, ustate) {
    (this.uname = uname),
      (this.uid = uid),
      (this.uexp = uexp),
      (this.ustate = ustate);
  }
  uname = this.uname;
  uid = this.uid;
  uexp = this.uexp;
  ustate = this.ustate;
  //  uabout = this.uabout;
}

async function users(m) {
  const db = JSON.parse(fs.readFileSync("./usersdb.json"));
  let chat = await m.getChat();
  let user = await m.getContact();
  let uname = user.pushname;
  let uid = user.number;
  let uexp = 0;
  let ustate = false;
  //let uabout = await user.getAbout()
  let newUser = new userScheme(uname, uid, uexp, ustate);
  let jsonArr = [...db];
  let userObject = {
    userName: newUser.uname,
    userId: newUser.uid,
    userExp: newUser.uexp,
    banState: newUser.ustate,
    // About: newUser.uabout
  };
  jsonArr.push(userObject);
  let data = JSON.stringify(jsonArr);
  fs.writeFileSync("usersdb.json", data);
}
async function updateUser(m, val, db) {
  let contact = await m.getContact();
  let { userExp, banState } = val;
  let id = contact.number;
  db.forEach((user, i) => {
    if (user.userId == id) {
      db[i].userExp = userExp;
      db[i].banState = banState;
    }
  });
  let data = JSON.stringify(db);
  fs.writeFileSync("usersdb.json", data);
}
async function getUser(m) {
  const walletDb = JSON.parse(fs.readFileSync("wallets.json"));
  const db = JSON.parse(fs.readFileSync("usersdb.json"));
  const chat = await m.getChat();
  const contact = await m.getContact();
  let wallet;
  walletDb.forEach((user) => {
    if (user.id == contact.number) {
      wallet = user.wallet;
      return;
    }
  });
  db.forEach(async (user) => {
    if (user.userId == contact.number) {
      let rank = ranks[Math.floor(user.userExp / 100 - 1)] ?? "beginners";
      await m.reply(
        `🏮Name: ${user.userName}\n\n🎏 Experience: ${
          user.userExp
        }\n\n 🏅Rank: ${rank}\n\n💸Wallet: ${wallet ?? 0}\n\n🚩❌Ban: ${
          user.banState
        }`
      );
      return;
    }
  });
}
async function isBanned(m) {
  const db = JSON.parse(fs.readFileSync("usersdb.json"));
  const chat = await m.getChat();
  const contact = await m.getContact();
  let bool;
  db.forEach(async (user) => {
    if (user.userId == contact.number) {
      if (user.banState == true) {
        bool = true;
      } else {
        bool = false;
      }
    }
  });
  return bool;
}
async function BanUser(number) {
  let db = JSON.parse(fs.readFileSync("usersdb.json"));
  let id = number;
  db.forEach((user, i) => {
    if (user.userId == id) {
      db[i].userExp = 0;
      db[i].banState = true;
    }
  });
  let data = JSON.stringify(db);
  fs.writeFileSync("usersdb.json", data);
}
async function unBanUser(number) {
  let db = JSON.parse(fs.readFileSync("usersdb.json"));
  let id = number;
  db.forEach((user, i) => {
    if (user.userId == id) {
      db[i].userExp = 0;
      db[i].banState = false;
    }
  });
  let data = JSON.stringify(db);
  fs.writeFileSync("usersdb.json", data);
}
async function LeaderBoard(m) {
  if (!m.body.includes("-")) {
    const db = JSON.parse(fs.readFileSync("usersdb.json"));
    db.sort((a, b) => {
      return b.userExp - a.userExp;
    });
    let text = "Leader Board🎇🎗🎁🎗✨\n\n";
    db.forEach((user, i) => {
      let rank = ranks[Math.floor(user.userExp / 100 - 1)] ?? "beginners";
      text += `>${i + 1}\n🏮 Name: ${user.userName}\n\n🎏 Experience: ${
        user.userExp
      }\n\n🏅 Rank: ${rank}\n\n❌ Ban: ${
        user.banState
      }\n\n --------🧨🧨-------\n\n\n`;
    });
    m.reply(text);
  }
}
module.exports = {
  users,
  updateUser,
  getUser,
  isBanned,
  BanUser,
  LeaderBoard,
  unBanUser,
};
