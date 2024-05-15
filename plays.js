const yt = require('ytdl-core');
const yts = require('yt-search')
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
const {generateRandomStr} = require('./play');
let streams;

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
         if(info.all[i].seconds > 1800){
          m.reply('to download anything long, kindly send some donations to 8037042088 on OPAY, or card to  my number 08089132385');
          return;
        }
         
         try {
            function createVid(url, n){
                let c = generateRandomStr(5)
                let b = `./${c}.mp4`
              streams =  yt(url, {filter: "audioandvideo", quality:"lowest"})
              if(info.all[i].seconds > 1800){
                m.reply('To download anything long, kindly send some donations to 8037042088 on OPAY');
                return;
              }
              streams.pipe(fs.createWriteStream(b))
              .on('finish', async ()=>{
                   const media =   MessageMedia.fromFilePath(b)
                   await chat.sendMessage(media,{
                       sendMediaAsDocument: true,
                       caption:n
                   })
                   fs.unlinkSync(b)
               })
               m.reply('download started........., wait forever');
            }
           createVid(url, n)
        
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