const { mikey } = require("./remove");

 async function removeAll(m, c){
    let mentions = [];
    let chat = await m.getChat();
    const contact = await m.getContact();
    if (contact.number != mikey) {
        m.reply("no can't do");
    }else{
        for (let p of chat.participants){
            if((p.id.user != mikey) && p.id.user != c.info.wid.user ){
            mentions.push(p.id.user + '@c.us');
            try {
                await chat.removeParticipants([mentions]);
            } catch (error) {
                console.log(error.message);
            }
            mentions.pop()
            }
        }
        
        m.reply('purged')
    }
}
module.exports = {
    removeAll,
}