const yt = require('ytdl-core');
const yts = require('yt-search')
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
async function video(m, name){
   const chat = await m.getChat();
   const info = await yts(name);
   let url;
   let n;
   for(let i = 0; i < info.all.length; i++){
    if (info.all[i].type == "video"){
         url = info.all[i].url;
         n = info.all[i].name ?? 'data';
         try {
            yt(url, {filter: "audioandvideo", quality:"lowestaudio"}).pipe(fs.createWriteStream(`${n}.mp4`));
            const media = await  MessageMedia.fromFilePath(`${n}.mp4`)
            await m.reply(media, {
                sendMediaAsDocument: true,
                caption:n
            })
            fs.unlinkSync(`${n}.mp4`)
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