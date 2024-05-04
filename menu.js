const menu = [
    '\n------General------\n',
    '!m',
    '!sticker',
    "!sticker-g",
    '!everyone',
    '!wordlength',
    '!invite',
    '!ping',
    '!type',
    '!play',
    '\n------Owner--------\n',
    '!leave',
    '!join',
    '!add',
    '!delete',
    '!remove',
    '!remove-all',
    '\n-------Info--------\n',
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
  Welcome, to this experiment,
  let's build from here\n
  commands🦾👇:
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
