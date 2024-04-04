const menu = [
    '!m',
    '!sticker',
    '!everyone',
    '!add',
    '!wordlength',
    '!invite',
    '!ping',
    '!leave',
    '!join',
    '!add',
    '!info',
    '!groupinfo',
    '!delete',
    '!remove'
]
function say(a){
  let b =  a.slice(10);
  return b;
}
function generateMenu(){
  let commands = '';
  menu.forEach(t =>{
    commands += t
    commands += ' /\\/->  '
  })
  let text = `
  Welcome, to this experiment,
  let's build from here
  commands🦾👇:
  ${commands}
  made with ❤ by Ayomide(Mikey)
  `
  return text;
}
module.exports={
    menu,
    say,
    generateMenu
}
