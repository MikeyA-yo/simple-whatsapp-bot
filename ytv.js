const yt = require('ytdl-core');
const fs = require('fs');
const {generateRandomStr} = require('./play');
const { MessageMedia } = require('whatsapp-web.js');
async function ytv(m, url){
    const chat = await m.getChat();
    const fName = generateRandomStr(3);
    const dataStream = yt(url,{filter: "audioandvideo", quality:"lowest"});
    const details = (await yt.getBasicInfo(url,{filter: "audioandvideo", quality:"lowest"})).videoDetails;
    if (details.lengthSeconds > 1800){
      m.reply('to download anything long, kindly send some donations to 8037042088 on OPAY, or card to  my number 08089132385');
      return;
    }
    try{
       dataStream
       .pipe(fs.createWriteStream(`${fName}.mp4`))
       .on('finish',async ()=>{
         const video = MessageMedia.fromFilePath(`${fName}.mp4`)
         await chat.sendMessage(video ,{
            sendMediaAsDocument: true,
            caption: details.title
         })
         fs.unlinkSync(`${fName}.mp4`);
       })
       m.reply('download started.......')
    }catch(e){
         m.reply(`Error: ${e.message}`)
    }
}
module.exports = { ytv }