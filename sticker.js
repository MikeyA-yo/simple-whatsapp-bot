// const Jimp = require('jimp');
const { MessageMedia } = require('whatsapp-web.js');
const fetch = require('node-fetch');
const {exec} = require('node:child_process');
 const fs = require('fs');
// const { convert } = require('./converter');

async function gifToSticker(m) {
    if (m.hasMedia && m.type == 'video') {
        try {
            const chat =  await m.getChat();
            const media = await m.downloadMedia();
            const bin = Buffer.from(media.data, 'base64');
            // Fetch the GIF data
            // const gifRes = await fetch(m.mediaUrl);
            // const gifData = await gifRes.buffer();
            //  fs.writeFileSync('input.mp4', media.data);
            // const med = new MessageMedia.fromFilePath('./input.mp4');
            console.log(m)
            await chat.sendMessage(media, {
                sendVideoAsGif:true
            });

            // // Convert the GIF file to WebP format using FFmpeg
            // exec('ffmpeg -i input.gif -vf "scale=512:-1" -vcodec libwebp -lossless 1 output.png', async (error, stdout, stderr) => {
            //     if (error) {
            //         msg.reply(`Conversion error: ${error.message}`);
            //         return;
            //     }

            //     // Read the converted WebP file
            //     const webpData = fs.readFileSync('output.png');

            //     // Send the WebP file as a sticker
            //     const chat = await msg.getChat();
            //     chat.sendImageAsSticker(webpData, { keepScale: true });

            //     // Clean up the temporary files
            //     fs.unlinkSync('input.gif');
            //     fs.unlinkSync('output.webp');
            // });
            // Write GIF data to a temporary file
            // fs.writeFileSync('input.gif', gifData);

            // Load the GIF file with Jimp
            // await convert(input.gif, 'output');
            // let media = await m.downloadMedia();
            // // Send the PNG file as a sticker
            // const chat = await m.getChat();
            // await chat.sendMessage(media, {
            //   sendMediaAsSticker: true,
            //   stickerAuthor: 'Mikey',
            //   stickerName:'Bot'
            //  });

            // Clean up the temporary files
            // fs.unlinkSync('input.gif');
            // fs.unlinkSync('output.mp4');
        } catch (error) {
            console.error('Error converting or sending sticker:', error);
            m.reply('Error processing the sticker.');
        }
    }
}

module.exports = {
    gifToSticker,
};
