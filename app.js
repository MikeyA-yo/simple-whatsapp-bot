const puppeteer = require('puppeteer');
const GroupChat = require('whatsapp-web.js/src/structures/GroupChat');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const { Client, LocalAuth } = require('whatsapp-web.js');
  const { GroupChat } = require('whatsapp-web.js')
  const qrcode = require('qrcode-terminal');
const {lengthWords} = require('./word');
const {menu, say, generateMenu} = require('./menu');
const {removeFunc, mikey} = require('./remove');
const {gifToSticker} = require('./sticker');
  const client = new Client({
    authStrategy:new LocalAuth({
      dataPath: "..Cache/Clients/Client1"
    }),
      puppeteer: {
          browserWSEndpoint: await browser.wsEndpoint()
      },
      webVersion: '2.2409.2',
      webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html'
      }
  });
  const group = new GroupChat();
 module.exports = {
  client
 }
  client.on('qr', (qr) => {
      // No need to handle QR code when using Puppeteer
      qrcode.generate(qr, {small: true});
  });
  client.on("authenticated", () => {
    console.log("Authentication successful");
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
      }else if (msg.body.startsWith('!wordlength')){
        const body = msg.body.slice(12);
        const length = await String(lengthWords(body));
       await msg.reply(length);
      }else if (msg.body == s || msg.body == '!s') {
             const chat = await msg.getChat();
           if (!msg.hasMedia && !msg.hasQuotedMsg){
               msg.reply('no pic provided')
           }else if (msg.hasMedia && msg.type == 'image'){
            const media = await msg.downloadMedia();
            chat.sendMessage(media, {
            sendMediaAsSticker: true,
            stickerAuthor: 'Mikey',
            stickerName:'Bot'
           }) 
         }else if(msg.hasQuotedMsg){
          const quote = await msg.getQuotedMessage();
          if (!quote.hasMedia) msg.reply('no pic provided');
          if(quote.hasMedia && quote.type == 'image'){
           try {
            const media = await quote.downloadMedia()
            chat.sendMessage(media, {
              sendMediaAsSticker: true,
              stickerAuthor: 'Mikey',
              stickerName:'Bot'
             })
           } catch (e) {
            msg.reply(e.message);
           }
          }
         }
      }else if(msg.body == '!s-g' || msg.body == '!sticker-g') {
       if(msg.type == 'video'){
        try {
          gifToSticker(msg);
        } catch (e) {
          msg.reply(e.message);
        }
       }else if(msg.hasQuotedMsg){
        const q = await msg.getQuotedMessage()
        if(q.type == 'video'){
          try {
            gifToSticker(q);
          } catch (e) {
            msg.reply(e.message);
          }
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
      let contact = await msg.getContact()
    if(contact.number != mikey){
      msg.reply('you are not permitted')
    }else{
      let chat = await msg.getChat();
      if (chat.isGroup) {
          chat.leave();
      } else {
          msg.reply('This command can only be used in a group!');
      }
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
      let contact = await msg.getContact()
      console.log(contact.number);
      let numbers = msg.body.slice(5).split(" ");
      numbers = numbers.map(no => {
          if (!no.endsWith('@c.us')) {
              return no + '@c.us';
          }
          return no;
      });
  
      try {
        if(msg.body.length < 15){
          msg.reply('invalid');
        }else{
          if (contact.number == mikey){
            const result = await chat.addParticipants(numbers);
            msg.reply(result.message);
            msg.reply('user added')
          }
          else{
            msg.reply("don't ban my bot please")
          }
        }
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
      const mentions = await msg.getMentions();
      const contact = await msg.getContact();
      console.log(mentions.number);
          // Assuming you have a method to map contact name to phone number
          
         const phoneNumber = removeFunc(msg.body.slice(8), chat);
         let no = phoneNumber + '@c.us';
         try {
          if(contact.number == mikey){
            await chat.removeParticipants([no]);
             msg.reply('done');
          }else{
            msg.reply('not allowed for this process');
          }
         } catch (error) {
          msg.reply(error.message)
         }
      
    }else  if (msg.hasQuotedMsg && msg.body.startsWith('!remove')) {
      const quotedMsg = await msg.getQuotedMessage();
      
      if (quotedMsg) {
          const quotedSender = quotedMsg.from; // Get the sender of the quoted message
          
          // Extract the phone number from the message body
          const phoneNumber = quotedSender; // Assuming "!remove" is 8 characters
          
         try {
           // Remove the participant using the provided phone number
           const chat = await msg.getChat();
           await chat.removeParticipants([phoneNumber + '@c.us']);
           msg.reply('Participant removed from the group successfully!');
         } catch (e) {
            msg.reply(e.message)
         }
      } else {
          msg.reply('Quoted message not found!');
      }
   }else if (msg.hasQuotedMsg && msg.body.startsWith('!delete')) {
    // Get the quoted message object
    const quotedMsg = await msg.getQuotedMessage();
    
    if (quotedMsg) {
        // Delete the quoted message
       try {
        await quotedMsg.delete(true); // Passing true deletes the message for everyone
        msg.reply('deleted');
       } catch (e) {
        msg.reply(e.message)
       }
    } else {
        msg.reply('Quoted message not found!');
    }
  }else if(msg.body.startsWith('!type')){
    if(msg.hasQuotedMsg){
      let quote = await msg.getQuotedMessage();
      msg.reply(quote.type);
    }else{
      msg.reply(msg.type);
    }
  }
  
  
 });
 client.on('group_join',async (notification) => {
  // User has joined or been added to the group.
  // console.log('join', notification);
  //const chat = await notification.getChat();
 //const participantNumber = notification.id.participant;
 
// Extract the participant name or phone number const participant = participants.find(participant => participant.id.user === phoneNumber);
//const participantName = chat.participants.find(participant => participant.id.user === participantNumber) ?? participantNumber.substring(0, 13);
// const taggedParticipant = `@${participantName}`;
// Send a greeting message mentioning the participant
// notification.reply(`Yo , @${notification.id.participant.substring(0,13)} it's your favorite cyborg Mikey greeting!`, {mentions: [notification.id.participant]});
// let newMembers = await notification.getChat().participants;
// let unique;
// newMembers.forEach(n =>{
//   if(!members.includes(n)) unique = n;
// })
 let b = `@${notification.id.participant.substring(0, 13)}`
 notification.reply(`yo ${b} it's your favorite cyborg Mikey greeting`, {mentions: [notification.id.participant]});
 });
 client.on('group_leave', (notification) => {
  // User has left or been kicked from the group.
  // console.log('leave', notification);
  let b = `@${notification.id.participant.substring(0, 13)}`
  notification.reply(`Sayonara ${b}.`, {mentions: [notification.id.participant]});
});
client.on('group_admin_changed', (notification) => {
  if (notification.type === 'promote') {
      /** 
        * Emitted when a current user is promoted to an admin.
        * {@link notification.author} is a user who performs the action of promoting/demoting the current user.
        */
       notification.reply(`You were promoted by ${notification.author}`)
      console.log(`You were promoted by ${notification.author}`, notification);
  } else if (notification.type === 'demote')
      /** Emitted when a current user is demoted to a regular user. */
      notification.reply(`You were demoted by ${notification.author}`)
      console.log(`You were demoted by ${notification.author}`);
});

  await client.initialize();
})();
