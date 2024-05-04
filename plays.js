const yt = require('ytdl-core');
const yts = require('yt-search')
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
function createVid(url, n){
    let b = `./${n}.mp4`
    yt(url, {filter: "audioandvideo", quality:"lowest"}).pipe(fs.createWriteStream(b));
}
async function video(m, name){
   const chat = await m.getChat();
   const info = await yts(name);
   let url;
   let n;
   for(let i = 0; i < info.all.length; i++){
    if (info.all[i].type == "video"){
         url = info.all[i].url;
         let c = info.all[i].title
         //b.split(" ").join() ??
         n = c ?? name;
         let b = `./${n}.mp4`
         await createVid(url, n);
         try {
            const media = await  MessageMedia.fromFilePath(b)
            await chat.sendMessage(media,{
                sendMediaAsDocument: true,
                caption:n
            })
          
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
module.exports = {video}