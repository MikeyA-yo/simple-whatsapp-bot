const { mikey } = require("./remove");

 async function removeAll(m, c){
    let mentions = [];
    let chat = await m.getChat();
    const contact = await m.getContact();
    if (contact.number != mikey) {
        m.reply("no can't do");
    }else{
        for (let p of chat.participants){
            if((p != mikey) && p != c.info.wid.user ){
            mentions.push(p + '@c.us'); 
            }
        }
        await chat.removeParticipants([mentions]);
        m.reply(done)
    }
}
module.exports = {
    removeAll,
}