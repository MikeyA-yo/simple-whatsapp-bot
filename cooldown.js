const fs = require("fs");
class CoolDown {
  constructor(id, lastSec) {
    this.id = id;
    this.lastSec = lastSec;
  }
}

async function coolDown(m) {
  const db = JSON.parse(fs.readFileSync("cooldown.json"));
  const contact = await m.getContact();
  let id = contact.number;
  let lastSec = new Date().getSeconds();
  let newCool = new CoolDown(id, lastSec);
  let jsonArr = [...db];
  jsonArr.push(newCool);
  let data = JSON.stringify(jsonArr);
  fs.writeFileSync("cooldown.json", data);
}

async function checkUserCool(m) {
  const contact = await m.getContact();
  let id = contact.number;
  let now = new Date().getSeconds();
  const db = JSON.parse(fs.readFileSync("cooldown.json"));
  let bool;
  db.forEach((cool, i) => {
    if (cool.id == id) {
      if (cool.lastSec - now >= 5 || now - cool.lastSec >= 5) {
        bool = true;
        db[i].lastSec = now;
      } else {
        bool = false;
      }
    }
  });
  let data = JSON.stringify(db);
  fs.writeFileSync("cooldown.json", data);
  return bool;
}
module.exports = { coolDown, checkUserCool };
