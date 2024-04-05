
const { fs } = require('node:fs');
const sharp = require('sharp');


async function gifToSticker(m){
   if(m.hasMedia && m.type == 'image/gif'){
    const gifRes = await fetch(m.mediaUrl);
    const gifData = await gifRes.arrayBuffer();
    const gif = Buffer.from(gifData);
    fs.writeFileSync('i.gif', gif);
     // Convert the GIF file to WebP format using ffmpeg
     sharp('i.gif')
     .mp4()  // No need for .webp()
     .toFile('output.mp4')
     .then(async () => {
       // Send the MP4 file (adjust if a different method is needed)
       const webpData = fs.readFileSync('output.mp4');
       const chat = await m.getChat();
       chat.sendMedia(webpData, { caption: 'Animated Sticker' }); // Use a suitable method for videos
     })
     .catch(err => {
       console.error('Error converting or sending video:', err);
       m.reply('Error processing the sticker.');
     });
        // const webpData = fs.readFileSync('output.mp4');

        // // Send the WebP file as a sticker
        // const chat = await m.getChat();
        // chat.sendImageAsSticker(webpData, { keepScale: true });

        // Clean up the temporary files
        fs.unlinkSync('i.gif');
        fs.unlinkSync('output.mp4');
     
   }
}
module.exports = {
    gifToSticker,
}