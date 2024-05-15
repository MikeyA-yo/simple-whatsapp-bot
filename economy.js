const fs = require("fs");
const { generateRandomStr } = require("./play");

class WalletScheme {
  constructor(wallet, bank, debt, lent, id, dailyTime) {
    this.wallet = wallet;
    this.bank = bank;
    this.debt = debt;
    this.lent = lent;
    this.id = id;
    this.dailyTime = dailyTime;
  }
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
async function createWallet(m) {
  try {
    const db = JSON.parse(fs.readFileSync("wallets.json"));
    let contact = await m.getContact();
    let id = contact.number;
    let wallet = 0;
    let bank = 0;
    let debt = 0;
    let lent = 0;
    let dailyTime = 0;
    let jsonArr = [...db];
    let walletHolder = new WalletScheme(
      wallet,
      bank,
      debt,
      lent,
      id,
      dailyTime
    );
    jsonArr.push(walletHolder);
    let data = JSON.stringify(jsonArr);
    fs.writeFileSync("wallets.json", data);
  } catch (e) {
    m.reply(e.message);
  }
}
async function daily(m) {
  const db = JSON.parse(fs.readFileSync("wallets.json"));
  let contact = await m.getContact();
  let id = contact.number;
  let day = new Date().getDate();
  db.forEach((user, i) => {
    if (user.id == id) {
      if (user.dailyTime == 0) {
        db[i].dailyTime = day;
        db[i].wallet += 10000;
        m.reply(
          `You Just claimed your daily 10k\nYour Wallet💸💸 Balance: ${db[i].wallet}`
        );
      } else if (user.dailyTime == day) {
        m.reply("be patient, you have claimed it for today");
      } else {
        db[i].dailyTime = day;
        db[i].wallet += 10000;
        m.reply(
          `You Just claimed your daily 10k\nYour Wallet💸💸 Balance: ${db[i].wallet}`
        );
      }
      return;
    }
  });
  let data = JSON.stringify(db);
  fs.writeFileSync("wallets.json", data);
}
async function wallet(m) {
  const db = JSON.parse(fs.readFileSync("wallets.json"));
  let contact = await m.getContact();
  let name = await contact.pushname;
  let id = contact.number;
  db.forEach((user) => {
    if (id == user.id) {
      m.reply(
        `Hello, ${name}✨\n\n💸Wallet: ${user.wallet}\n\n🏛Bank :${user.bank}`
      );
      return;
    }
  });
}
async function deposit(m, amount) {
  const db = JSON.parse(fs.readFileSync("wallets.json"));
  let contact = await m.getContact();
  let id = contact.number;
  db.forEach((user, i) => {
    if (user.id == id) {
      if (amount > user.wallet) {
        m.reply("nigga you're broke your balance ain't enough for this");
      } else {
        db[i].wallet -= amount;
        db[i].bank += amount;
        m.reply(
          `You have deposited ${amount} to your bank\n Balance: ${db[i].wallet}`
        );
      }
      return;
    }
  });

  let data = JSON.stringify(db);
  fs.writeFileSync("wallets.json", data);
}
async function bank(m) {
  const db = JSON.parse(fs.readFileSync("wallets.json"));
  let contact = await m.getContact();
  let name = await contact.pushname;
  let id = contact.number;
  db.forEach((user) => {
    if (id == user.id) {
      m.reply(
        `Hello, ${name}✨\n\n💸Wallet: ${user.wallet}\n\n🏛Bank :${user.bank}`
      );
      return;
    }
  });
}
async function slot(m, amount) {
  const { SlotMachine, SlotSymbol } = require("slot-machine");
  const db = JSON.parse(fs.readFileSync("wallets.json"));
  let contact = await m.getContact();
  let id = contact.number;
  const emojis = ["💈", "🥇", "🎟", "🎲", "❄", "🔥"];
  let slotArr = [];
  emojis.map((emoji) => {
    let newSlotSymbol = new SlotSymbol(generateRandomStr(5), {
      display: emoji,
      points: randomInt(60, 100),
      weight: randomInt(25, 50),
    });
    slotArr.push(newSlotSymbol);
  });
  const machine = new SlotMachine(3, slotArr);
  const res = machine.play();
  let text = `🧧✨Slot Machine✨🧧\n\n${res.visualize()}`;
  let points = res.totalPoints + randomInt(90,150)
  let amountWon =
    points > 200
      ? amount * 9
      : points > 100
      ? amount * 3
      : -amount;
  db.forEach((wal, i) => {
    if (wal.id == id) {
       if (wal.wallet < amount){
        m.reply(`your account is so low`)
       }else{
        db[i].wallet += amountWon;
        text += `\n\n🎗🎲🎰You ${
          amountWon > amount ? "won" : "lost"
        } ${amountWon}🎗🎲🎰`;
        m.reply(text);
       }
      return;
    }
  });
  let data = JSON.stringify(db);
  fs.writeFileSync("wallets.json", data);
}
async function withdraw(m, amount){
    const db = JSON.parse(fs.readFileSync("wallets.json"));
    let contact = await m.getContact();
    let id = contact.number;
    db.forEach((user, i) => {
      if (user.id == id) {
        if (amount > user.bank) {
          m.reply("nigga you're broke your balance ain't enough for this");
        } else {
          db[i].wallet += amount;
          db[i].bank -= amount;
          m.reply(
            `You have withdrawn ${amount} from your bank\n💸Balance: ${db[i].wallet}`
          );
        }
        return;
      }
    });
  
    let data = JSON.stringify(db);
    fs.writeFileSync("wallets.json", data);
}
module.exports = { createWallet, daily, wallet, deposit, bank, slot, withdraw };
