const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  
  const { Client } = require('whatsapp-web.js');
  const qrcode = require('qrcode-terminal');
const {lengthWords} = require('./word');
  const client = new Client({
      puppeteer: {
          browserWSEndpoint: await browser.wsEndpoint()
      }
  });

  client.on('qr', (qr) => {
      // No need to handle QR code when using Puppeteer
      qrcode.generate(qr, {small: true});
  });

  client.on('ready', () => {
      console.log('Client is ready!');
  });

  client.on('message', async msg => {
      if (msg.body == '!ping') {
          msg.reply('pong');
      }else if (msg.body == '!x') {
        msg.reply('o')
      }else if (msg.body.includes('!wordlength')){
        const body = msg.body.slice(12);
        console.log(body)
        const length = await String(lengthWords(body));
        console.log(length);
       await msg.reply(length);
       (await msg.getChat()).sendMessage(length)
      }else if (msg.body == ('!sticker' || '!s')) {
             const chat = await msg.getChat();
           if (!msg.hasMedia){
               msg.reply('no pic provided')
           }else if (msg.hasMedia ){
            const media = await msg.downloadMedia();
            chat.sendMessage(media, {
            sendMediaAsSticker: true
           }) 
         }
      }
  });

  await client.initialize();
})();
