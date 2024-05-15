const yt = require('ytdl-core');
const fs = require('fs');
const {generateRandomStr} = require('./play');
const { MessageMedia } = require('whatsapp-web.js');
async function yta(m, url){
    const chat = await m.getChat();
    const fName = generateRandomStr(3);
    const dataStream = yt(url,{filter: "audioonly", quality:"lowest"});
    const details = (await yt.getBasicInfo(url,{filter: "audioonly", quality:"lowest"})).videoDetails;
    if (details.lengthSeconds > 1800){
      m.reply('To download anything long, kindly send some donations to 8037042088 on OPAY');
      return;
    }
    try{
       dataStream
       .pipe(fs.createWriteStream(`${fName}.mp3`))
       .on('finish',async ()=>{
         const audio = MessageMedia.fromFilePath(`${fName}.mp3`)
         await chat.sendMessage(audio,{
            sendMediaAsDocument: true,
            caption: details.title
         })
         fs.unlinkSync(`${fName}.mp3`)
       });
       m.reply('download started.......')
    }catch(e){
         m.reply(`Error: ${e.message}`)
    }
}
module.exports = {yta }