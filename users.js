const fs = require('fs');
const db = JSON.parse(fs.readFileSync('usersdb.json'))
class userScheme{
    constructor(uname, uid, uexp, ustate, ){
        this.uname = uname,
        this.uid = uid,
        this.uexp = uexp,
        this.ustate = ustate
    }
    uname = this.uname;
    uid = this.uid;
    uexp = this.uexp;
    ustate = this.ustate;
  //  uabout = this.uabout;
}

async function users(m){
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
    }
    jsonArr.push(userObject)
    let data = JSON.stringify(jsonArr);
    fs.writeFileSync('usersdb.json', data);
}
async function updateUser(m, val, db){
   let contact = await m.getContact();
   let {userExp, banState} = val;
   let id = contact.number;
   db.forEach((user, i )=> {
     if (user.userId == id){
        db[i].userExp = userExp;
        db[i].banState = banState;
     }
   });
   let data = JSON.stringify(db);
   fs.writeFileSync('usersdb.json', data);
}
async function getUser(m){
    const db = JSON.parse(fs.readFileSync('usersdb.json'));
      const chat = await m.getChat();
      const contact = await m.getContact();
      db.forEach(async (user) => {
        if (user.userId == contact.number) {
          await m.reply(
            `Name: ${user.userName}\n\nExperience: ${user.userExp}\n\nBan: ${user.banState}`
          );
          return;
        }
      });
}
async function isBanned(m){
    const db = JSON.parse(fs.readFileSync('usersdb.json'));
    const chat = await m.getChat();
    const contact = await m.getContact();
    let bool;
    db.forEach(async (user) => {
      if (user.userId == contact.number) {
        if(user.banState == true){
            bool = true;
        }else{
            bool = false;
        }
        
      }
    });
    return bool;
}
async function BanUser(number ){
    let db = JSON.parse(fs.readFileSync('usersdb.json'))
    let id = number;
    db.forEach((user, i )=> {
      if (user.userId == id){
         db[i].userExp = 0;
         db[i].banState = true;
      }
    });
    let data = JSON.stringify(db);
    fs.writeFileSync('usersdb.json', data);
}
async function LeaderBoard(m){
    const db = JSON.parse(fs.readFileSync('usersdb.json'));
    db.sort((a , b) =>{
        return b.userExp - a.userExp
    })
    let text = 'Leader Board🎇🎗🎁🎗✨\n\n';
    db.forEach((user, i) =>{
     text += `${i+1} Name: ${user.userName}\n\nExperience: ${user.userExp}\n\nBan: ${user.banState}\n\n --------🧨🧨-------\n\n\n`
    })
    m.reply(text);
}
module.exports = { users, updateUser, getUser, isBanned, BanUser, LeaderBoard }