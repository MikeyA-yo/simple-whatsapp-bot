const yt = require('@distube/ytdl-core');
const yts = require('yt-search')
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
let streams;
function generateRandomStr(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }
  return result;
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
         if(info.all[i].seconds > 1800){
          m.reply('To download anything long, kindly send some donations to 8037042088 on OPAY');
          return;
        }
        if(n.includes('/') || n.includes('\\') || n.includes('|')){
          n = n.replace(/[\/\\|]/g, '');
        }
         try {
          function createAudio(url, n){
            let name = generateRandomStr(5);
            let stream = fs.createWriteStream(`./${name}.mp3`);
            streams = yt(url, {filter: "audioonly", quality:"lowest"})
            try{
              streams.pipe(stream)
              .on('finish',async ()=>{
                   try{
                    const media =  MessageMedia.fromFilePath(`./${name}.mp3`)
                    await chat.sendMessage(media, {
                       sendMediaAsDocument: true,
                      caption:n
                     })
                    fs.unlinkSync(`./${name}.mp3`)
                   }catch(e){
                    m.reply(e.message)
                   }
                  })
                  m.reply('download started......., wait a minute')
            }catch(e){
              m.reply(e.message)
            }
        }
       createAudio(url, n)
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
async function audio(m, name){
  const chat = await m.getChat();
  const info = await yts(name);
  let url;
  let n;
  for(let i = 0; i < info.all.length; i++){
   if (info.all[i].type == "video"){
    if(info.all[i].seconds >= 1800){
      m.reply('to download anything long, kindly send some donations to 8037042088 on OPAY, or card to  my number 08089132385');
      return;
    }
        url = info.all[i].url;   
        let b = info.all[i].title
        if(info.all[i].seconds > 1800){
          m.reply('to download anything long, kindly send some donations to 8037042088 on OPAY, or card to  my number 08089132385');
          return;
        }
        console.log(info.all[i].seconds)
        //b.split(" ").join() ??
        n = b ?? name;
       if(n.includes('/') || n.includes('\\') || n.includes('|')){
         n = n.replace(/[\/\\|]/g, '');
       }
        try {
         function createAudio(url, n){
           let name = generateRandomStr(5);
           let stream = fs.createWriteStream(`./${name}.mp3`);
           streams = yt(url, {filter: "audioonly", quality:"lowest"})
           console.log(info.all[i].seconds)
           if(info.all[i].seconds >= 1800){
            m.reply('to download anything long, kindly send some donations to 8037042088 on OPAY, or card to  my number 08089132385');
            return;
          }
           try{
             streams.pipe(stream)
             .on('finish',async ()=>{
                  try{
                   const media =  MessageMedia.fromFilePath(`./${name}.mp3`)
                   await chat.sendMessage(media, {
                    sendAudioAsVoice: true,
                    })
                   fs.unlinkSync(`./${name}.mp3`)
                  }catch(e){
                   m.reply(e.message)
                  }
                 })
                 m.reply('download started......., wait a minute')
           }catch(e){
             m.reply(e.message)
           }
       }
       if(info.all[i].seconds >= 1800){
        m.reply('to download anything long, kindly send some donations to 8037042088 on OPAY, or card to  my number 08089132385');
        return;
      }
      createAudio(url, n)
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
module.exports = {play, generateRandomStr, audio}