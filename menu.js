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
    '!groupinfo'
]
function say(a){
  let b =  a.slice(10);
  console.log(b)
  return b;
}
module.exports={
    menu,
    say
}

say('!everyone hello');