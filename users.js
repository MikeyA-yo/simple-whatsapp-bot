const fs = require('fs');
const db = require('./usersdb.json');
class userScheme{
    constructor(uname, uid, uexp, ustate){
        this.uname = uname,
        this.uid = uid,
        this.uexp = uexp,
        this.ustate = ustate
    }
    uname = this.uname;
    uid = this.uid;
    uexp = this.uexp;
    ustate = this.ustate;
}

async function users(m){
    let chat = await m.getChat();
    let user = await m.getContact();
    let uname = user.pushname;
    let uid = user.number;
    let uexp = 0;
    let ustate = false;
    let newUser = new userScheme(uname, uid, uexp, ustate); 
    let jsonArr = [...db];
    let userObject = {
        userName: newUser.uname,
        userId: newUser.uid,
        userExp: newUser.uexp,
        banState: newUser.ustate
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
        db[i].banState = banState ?? false;
     }
   });
   let data = JSON.stringify(db);
   fs.writeFileSync('usersdb.json', data);
}
module.exports = { users, updateUser }