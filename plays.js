const yt = require('ytdl-core');
const yts = require('yt-search')
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
let streams;
function createVid(url, n){
    let b = `./${n}.mp4`
  streams =  yt(url, {filter: "audioandvideo", quality:"lowest"})
  streams.pipe(fs.createWriteStream(b));
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
         
         try {
            await createVid(url, n);
            m.reply('download started........., wait a minute')
           // setTimeout(async ()=>{
            streams.on('finish', async ()=>{
                const media =   MessageMedia.fromFilePath(b)
                await chat.sendMessage(media,{
                    sendMediaAsDocument: true,
                    caption:n
                })
                fs.unlinkSync(b)
            })
           // }, 60500)
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