const yt = require('ytdl-core');
const fs = require('fs');
const {generateRandomStr} = require('./play');
const { MessageMedia } = require('whatsapp-web.js');
async function yta(m, url){
    const chat = await m.getChat();
    const fName = generateRandomStr(3);
    const dataStream = yt(url,{filter: "audioonly", quality:"lowest"});
    try{
       dataStream
       .pipe(fs.createWriteStream(`${fName}.mp3`))
       .on('finish',async ()=>{
         const audio = MessageMedia.fromFilePath(`${fName}.mp3`)
         await chat.sendMessage(audio,{
            sendMediaAsDocument: true
         })
         fs.unlinkSync(`${fName}.mp3`)
       });
       m.reply('download started.......')
    }catch(e){
         m.reply(`Error: ${e.message}`)
    }
}
module.exports = {yta }