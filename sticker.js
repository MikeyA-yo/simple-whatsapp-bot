// const Jimp = require('jimp');
const { MessageMedia } = require('whatsapp-web.js');
const fetch = require('node-fetch');
const {exec} = require('node:child_process');
var ffmpeg = require('fluent-ffmpeg');
 const fs = require('fs');
// const { convert } = require('./converter');

async function gifToSticker(m) {
    if (m.hasMedia && m.type == 'video') {
       try {
        const chat =  await m.getChat();
        const media = await m.downloadMedia();
       // let md = media.data;
        console.log(media)
        const bin = Buffer.from(media.data, 'base64');  
        fs.writeFileSync('input.mp4', bin);
        const sticker = await MessageMedia.fromFilePath('input.mp4');
        await chat.sendMessage(sticker, { sendMediaAsSticker: true, stickerAuthor: 'Mikey', stickerName:'Bot'});
        fs.unlinkSync('input.mp4')
       } catch (e) {
         m.reply(e.message)
       }
    }
}
// try {
//     const chat =  await m.getChat();
//     const media = await m.downloadMedia();
    
//     const bin = Buffer.from(media.data, 'base64');
//     const mediaM = new MessageMedia('video/mp4', media);
//     await m.reply(mediaM, {sendMediaAsSticker:true});
//     // Fetch the GIF data
//     // const gifRes = await fetch(m.mediaUrl);
//     // const gifData = await gifRes.buffer();
//     fs.writeFileSync('input.mp4', bin);
//     ffmpeg('./input.mp4')
//     .size('?x320') 
//     .videoBitrate('500k')
//     .fps(10) 
//     .outputOptions('-crf 28')
//     .save('output.webp')
//     .on('end', async () =>{
//         const webpData = fs.readFileSync('./output.webp');
//         const media = new MessageMedia('image/webp', webpData);

//                             try {
//                                 await m.reply('processed');
//                                 fs.unlinkSync(videoPath);
//                                 fs.unlinkSync(webpPath);
//                             } catch (error) {
//                                 m.reply(`Error sending sticker ${error.message} `);
//                             }
//     })
//     const mm =  MessageMedia.fromFilePath('./input.mp4');
    
//     // await chat.sendMessage(media, {
//     //     sendVideoAsGif:true
//     // });
//     // await chat.sendMessage(mm, {
//     //     sendMediaAsSticker: true,
//     //     stickerName: "Sticker Name",
//     //     stickerAuthor: "Author Name",   
//     // });
//   //  fs.unlinkSync('input.mp4');

//     // // Convert the GIF file to WebP format using FFmpeg
//     // exec('ffmpeg -i input.gif -vf "scale=512:-1" -vcodec libwebp -lossless 1 output.png', async (error, stdout, stderr) => {
//     //     if (error) {
//     //         msg.reply(`Conversion error: ${error.message}`);
//     //         return;
//     //     }

//     //     // Read the converted WebP file
//     //     const webpData = fs.readFileSync('output.png');

//     //     // Send the WebP file as a sticker
//     //     const chat = await msg.getChat();
//     //     chat.sendImageAsSticker(webpData, { keepScale: true });

//     //     // Clean up the temporary files
//     //     fs.unlinkSync('input.gif');
//     //     fs.unlinkSync('output.webp');
//     // });
//     // Write GIF data to a temporary file
//     // fs.writeFileSync('input.gif', gifData);

//     // Load the GIF file with Jimp
//     // await convert(input.gif, 'output');
//     // let media = await m.downloadMedia();
//     // // Send the PNG file as a sticker
//     // const chat = await m.getChat();
//     // await chat.sendMessage(media, {
//     //   sendMediaAsSticker: true,
//     //   stickerAuthor: 'Mikey',
//     //   stickerName:'Bot'
//     //  });

//     // Clean up the temporary files
//     // fs.unlinkSync('input.gif');
//     // fs.unlinkSync('output.mp4');
// } catch (error) {
//     console.error('Error converting or sending sticker:', error);
//     m.reply('Error processing the sticker.');
// }
module.exports = {
    gifToSticker,
};
