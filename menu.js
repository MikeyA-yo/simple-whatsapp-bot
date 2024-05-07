const menu = [
  '\n━━━❰ General ❱━━━\n\n',
  '!m',
  '!sticker',
  "!sticker-g",
  '!everyone',
  '!wordlength',
  '!invite',
  '!ping',
  '!type',
  '!play',
  '!video',
  '!audio',
  '!ytv',
  '!yta',
  '\n\n━━━❰ Owner ❱━━━\n\n',
  '!leave',
  '!join',
  '!add',
  '!delete',
  '!remove',
  '!remove-all',
  '!off',
  '\n\n━━━❰ Info ❱━━━\n\n',
  '!info',
  '!groupinfo',
]
function say(a){
let b =  a.slice(10);
return b;
}
function generateMenu(){
let commands = '';
menu.forEach(t =>{
  commands += t
  commands += ' 𖣘  '
})
let text = `
This help menu is designed to help you get started with the bot\n
⟾ 📪 Command list 📪
${commands}\n
made with ❤ by Ayomide(Mikey)
`
return text;
}
module.exports={
  menu,
  say,
  generateMenu
}