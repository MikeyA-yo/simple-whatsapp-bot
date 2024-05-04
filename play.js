const yt = require('ytdl-core');
const yts = require('yt-search')

async function play(m, name){
   const chat = await m.getChat();
   const info = await yts(name);
   let url;
   let n;
   for(let i = 0; i < info.all.length; i++){
    if (info.all[i].type == "video"){
         url = info.all[i].url;
         n = info.all[i].name;
         break;
    }
   }
   if(url == null){
    m.reply('Search not found');
   }
}