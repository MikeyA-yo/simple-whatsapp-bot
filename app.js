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
const {menu, say} = require('./menu');
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
    if(msg.body == '!h' || msg.body == '!help' || msg.body == '!m'){
      let commands;
      menu.forEach(t =>{
        commands += t
        commands += '/\/->'
      })
      let text = `
      Welcome, to this experiment,
      let's build from here
      commands🦾👇:
      ${commands}
      made with ❤🧡 by Ayomide(Mikey)
      `
     msg.reply(text);
    }
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
           if (!msg.hasMedia && !msg.hasQuotedMsg){
               msg.reply('no pic provided')
           }else if (msg.hasMedia ){
            const media = await msg.downloadMedia();
            chat.sendMessage(media, {
            sendMediaAsSticker: true,
            stickerAuthor: 'Mikey',
            stickerName:'Bot'
           }) 
         }else if(msg.hasQuotedMsg){
          const quote = await msg.getQuotedMessage();
          if (!quote.hasMedia) msg.reply('no pic provided');
          if(quote.hasMedia){
            const media = await quote.downloadMedia()
            chat.sendMessage(media, {
              sendMediaAsSticker: true,
              stickerAuthor: 'Mikey',
              stickerName:'Bot'
             })
          }
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
      }else if (msg.body.startsWith('!everyone')) {
        const chat = await msg.getChat();
        let content = say(msg.body) ;
        let text = '';
        let mentions = [];

        for (let participant of chat.participants) {
            mentions.push(`${participant.id.user}@c.us`);
            text += `@${participant.id.user} `;
        }
        const thing = `Message: ${content} 
        ${text}`

        await chat.sendMessage(thing, { mentions });
    } else if (msg.body === '!leave') {
      // Leave the group
      let chat = await msg.getChat();
      if (chat.isGroup) {
          chat.leave();
      } else {
          msg.reply('This command can only be used in a group!');
      }
    } else if (msg.body.startsWith('!join ')) {
      const inviteCode = msg.body.split(' ')[1].substring(26);
      try {
          await client.acceptInvite(inviteCode);
          msg.reply('Joined the group!');
      } catch (e) {
          msg.reply('That invite code seems to be invalid.');
      }
    }else if (msg.body.startsWith('!add')){
        const chat = await msg.getChat();
        const numbers = msg.body.slice(5).split(" ");
        numbers.forEach(no =>{
          if(no.endsWith('@c.us')){
            return no;
          }else{
            no +='@c.us';
            return no;
          }
        })
       const result = await chat.addParticipants(numbers);
       for (let i = 0; i < numbers.length; i++){
        let user = result.numbers[i];
        msg.reply(user.message);
       } 
    }else if (msg.body === '!groupinfo') {
      let chat = await msg.getChat();
      if (chat.isGroup) {
          msg.reply(`
              *Group Details*
              Name: ${chat.name}
              Description: ${chat.description}
              Created At: ${chat.createdAt.toString()}
              Created By: ${chat.owner.user}
              Participant count: ${chat.participants.length}
          `);
      } else {
          msg.reply('This command can only be used in a group!');
      }
      }else if (msg.body === '!info') {
         let info = client.info;
         client.sendMessage(msg.from, `
            *Connection info*
             User name: ${info.pushname}
             My number: ${info.wid.user}
             Platform: ${info.platform}
             Owner: Mikey(A-yo)
             🙃🙃
         `);
     }
  });

  await client.initialize();
})();
