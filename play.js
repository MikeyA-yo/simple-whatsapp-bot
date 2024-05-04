const yt = require('ytdl-core');
const yts = require('yt-search')
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
function createAudio(url, n){
    let stream = fs.createWriteStream(`./${n}.mp3`);
    yt(url, {filter: "audioonly", quality:"lowest"}).pipe(stream);
}
async function play(m, name){
   const chat = await m.getChat();
   const info = await yts(name);
   let url;
   let n;
   for(let i = 0; i < info.all.length; i++){
    if (info.all[i].type == "video"){
         url = info.all[i].url;   
         let b = info.all[i].title
         //b.split(" ").join() ??
         n = b ?? name;
         await createAudio(url, n)
         try {

            const media =  MessageMedia.fromFilePath(`./${n}.mp3`)
            await chat.sendMessage(media, {
                sendMediaAsDocument: true,
                caption:n
            })
           fs.unlinkSync(`./${n}.mp3`)
           } catch (error) {
            m.reply(error.message);
           }
         break;
    }
   }
   if(url == null){
    m.reply('Search not found');
    return 
   }
}
module.exports = {play}