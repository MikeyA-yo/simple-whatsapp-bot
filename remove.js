function removeFunc(a,b){
 let participants = b.participants;
 let number;
 participants.forEach(p => {
    if (a == `@${p.id.user}`){
        number = p.id.user;
    }else{
        number = p.id.user;
    }
 });
 return number;
}
module.exports = {
    removeFunc,
}