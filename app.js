const puppeteer = require('puppeteer');
const GroupChat = require('whatsapp-web.js/src/structures/GroupChat');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  
  const { Client, NoAuth } = require('whatsapp-web.js');
  const { GroupChat } = require('whatsapp-web.js')
  const qrcode = require('qrcode-terminal');
const {lengthWords} = require('./word');
const {menu, say, generateMenu} = require('./menu');
const {removeFunc} = require('./remove')
  const client = new Client({
    authStrategy:new NoAuth(),
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
    if(msg.body == '!h' || msg.body == '!help' || msg.body == '!m' || msg.body == '!menu'){
      let text = generateMenu()
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
    }else if (msg.body.startsWith('!add')) {
      const chat = await msg.getChat();
      let numbers = msg.body.slice(5).split(" ");
      numbers = numbers.map(no => {
          if (!no.endsWith('@c.us')) {
              return no + '@c.us';
          }
          return no;
      });
  
      try {
        const result = await chat.addParticipants(numbers);
        msg.reply(result);
        
      } catch (e) {
        msg.reply(e.message)
      }
  }
  else if (msg.body === '!groupinfo') {
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
     }else if (msg.body.startsWith('!remove')) {
      const chat = await msg.getChat();
      const mentions = msg.getMentions();
    
          // Assuming you have a method to map contact name to phone number
          
          const phoneNumber = removeFunc(msg.body.slice(8), chat);
          return phoneNumber + '@c.us';
      
  
      if (numbers.length > 0) {
          await chat.removeParticipants(numbers);
          msg.reply('Participants removed from the group successfully!');
        } else {
          msg.reply('No valid mentions found!');
       }
    }else  if (msg.hasQuotedMsg && msg.body.startsWith('!remove')) {
      const quotedMsg = await msg.getQuotedMessage();
      
      if (quotedMsg) {
          const quotedSender = quotedMsg.from; // Get the sender of the quoted message
          
          // Extract the phone number from the message body
          const phoneNumber = msg.body.slice(8).trim(); // Assuming "!remove" is 8 characters
          
          // Remove the participant using the provided phone number
          const chat = await msg.getChat();
          await chat.removeParticipants([phoneNumber + '@c.us']);
          msg.reply('Participant removed from the group successfully!');
      } else {
          msg.reply('Quoted message not found!');
      }
   }else if (msg.hasQuotedMsg && msg.body.startsWith('!delete')) {
    // Get the quoted message object
    const quotedMsg = await msg.getQuotedMessage();
    
    if (quotedMsg) {
        // Delete the quoted message
        await quotedMsg.delete(true); // Passing true deletes the message for everyone
        msg.reply('Quoted message deleted for everyone!');
    } else {
        msg.reply('Quoted message not found!');
    }
}
  
  
  });

  await client.initialize();
})();
