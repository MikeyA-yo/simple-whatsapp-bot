let mikey = '2348089132385'
function removeFunc(a,b){
 let participants = b.participants;
 let number;
 participants.forEach(p => {
    if (a == `@${p.id.user}`){
        number = p.id.user;
    }
 });
 return number;
}
module.exports = {
    removeFunc,
    mikey
}