const puppeteer = require('puppeteer');
const GroupChat = require('whatsapp-web.js/src/structures/GroupChat');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  
  const { Client } = require('whatsapp-web.js');
  const { GroupChat } = require('whatsapp-web.js')
  const qrcode = require('qrcode-terminal');
const {lengthWords} = require('./word');
  const client = new Client({
      puppeteer: {
          browserWSEndpoint: await browser.wsEndpoint()
      }
  });
  const group = new GroupChat();

  client.on('qr', (qr) => {
      // No need to handle QR code when using Puppeteer
      qrcode.generate(qr, {small: true});
  });

  client.on('ready', () => {
      console.log('Client is ready!');
  });
let s = '!sticker' || '!s'
  client.on('message', async msg => {
    if (msg.body.startsWith('!')) await  msg.react('😁');
      if (msg.body == '!ping') {
          msg.reply('pong');
      }else if (msg.body == '!x') {
        msg.reply('o')
      }else if (msg.body.includes('!wordlength')){
        const body = msg.body.slice(12);
        const length = await String(lengthWords(body));
       await msg.reply(length);
      }else if (msg.body == s) {
             const chat = await msg.getChat();
           if (!msg.hasMedia){
               msg.reply('no pic provided')
           }else if (msg.hasMedia ){
            const media = await msg.downloadMedia();
            chat.sendMessage(media, {
            sendMediaAsSticker: true,
            stickerAuthor: 'Mikey',
            stickerName:'Bot'
           }) 
         }
      }else if(msg.body == '!invite'){
        //todo fix this crap /// done
      try {
       const chat = await msg.getChat();
       if (chat.isGroup){
        const inv = await chat.name;
        const inv2 = await chat.getInviteCode();
        msg.reply(`${inv} : https://chat.whatsapp.com/${inv2}`);
       }
      } catch (e) {
        console.log(e.message)
      }
      }else if (msg.body === '!everyone') {
        const chat = await msg.getChat();
        
        let text = '';
        let mentions = [];

        for (let participant of chat.participants) {
            mentions.push(`${participant.id.user}@c.us`);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
  });

  await client.initialize();
})();
