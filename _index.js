const TOOLBOX = require('./src/_index.js');
const readline = require('readline');

var PROMPT=null;

function NEW_PROMPT(){
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "|~\x1b[44m\x1b[31m ▓▒░ \x1b[0m \x1b[7m CARNIVAL TOOLBOX \x1b[0m \x1b[44m\x1b[31m ░▒▓ \x1b[0m~>"
  }).on(
    'line',
    ON_PROMPT_LINE
  ).on(
    'close',
    ON_PROMPT_CLOSED
  );
}
function ON_PROMPT_CLOSED(){
  console.log('Thank you for using');
  process.exit(0);
}
function ON_PROMPT_LINE(line){
  switch(){
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  console.log(line);

  PROMPT.prompt();
}
function functionName() {

}

if(require.main===module){
  PROMPT=NEW_PROMPT();
  PROMPT.prompt();
}else{
  module.exports=TOOLBOX;
}
