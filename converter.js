const {fs} = require('node:fs');
async function convert(from, to, ...args){
   const data = fs.readFileSync(from);
   fs.writeFileSync(to.mp4);
   return true;
}
module.exports = {
    convert
}