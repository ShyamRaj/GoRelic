const util = require('util')
  , path = require('path')
  , forever = require('forever')
  , script = path.join(__dirname, '../index.js');
const yargs = require("yargs").usage(
    'Usage: use -count 5 to spin 5 node processes')
  .demand(['count'])
  .argv;

let count = yargs.count;
count--;
let dynamicVar;

for (count; count >= 0; count--) {
  dynamicVar = `child${count}`;
  dynamicVar = new(forever.Monitor)(script, {
    'args': ["-p=808" + count]
    , 'uid': 'GoRelic-' + count
  , });
  dynamicVar.start();
  console.log('Forever process running index.js on 808' + count);
}
