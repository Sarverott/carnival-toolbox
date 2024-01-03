const TOOLBOX = require('./src/_index.js');
const readline = require('readline');
const vm = require('vm');

const STANDARD_HEADER=`
\x1b[7m
|                                                                   |
|   ░█████╗░░█████╗░██████╗░███╗░░██╗██╗██╗░░░██╗░█████╗░██╗░░░░░   |
|   ██╔══██╗██╔══██╗██╔══██╗████╗░██║██║██║░░░██║██╔══██╗██║░░░░░   |
|   ██║░░╚═╝███████║██████╔╝██╔██╗██║██║╚██╗░██╔╝███████║██║░░░░░   |
|   ██║░░██╗██╔══██║██╔══██╗██║╚████║██║░╚████╔╝░██╔══██║██║░░░░░   |
|   ╚█████╔╝██║░░██║██║░░██║██║░╚███║██║░░╚██╔╝░░██║░░██║███████╗   |
|   ░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░░╚═╝░░░╚═╝░░╚═╝╚══════╝   |
|                                                                   |
|     ████████╗░█████╗░░█████╗░██╗░░░░░██████╗░░█████╗░██╗░░██╗     |
|     ╚══██╔══╝██╔══██╗██╔══██╗██║░░░░░██╔══██╗██╔══██╗╚██╗██╔╝     |
|     ░░░██║░░░██║░░██║██║░░██║██║░░░░░██████╦╝██║░░██║░╚███╔╝░     |
|     ░░░██║░░░██║░░██║██║░░██║██║░░░░░██╔══██╗██║░░██║░██╔██╗░     |
|     ░░░██║░░░╚█████╔╝╚█████╔╝███████╗██████╦╝╚█████╔╝██╔╝╚██╗     |
|___________________________________________________________________|
\x1b[0m

\t    \x1b[41mNPM:\x1b[0m \x1b[31mhttps://www.npmjs.com/package/carnival-toolbox\x1b[0m
\t \x1b[46mGitHub:\x1b[0m \x1b[36mhttps://github.com/Sarverott/carnival-toolbox\x1b[0m

\t\t\t \x1b[2m~~~ Sarverott @ 2024 ~~~\x1b[0m
`

const HELP_LEGEND=`
LEGEND:

Hi there!
write one of these from list (case sensitive) in prompt,
it's sandboxed code evaluator, so JS is also accepted.

`

var PROMPT=null;

function NEW_PROMPT(){
  Object.assign(TOOLBOX, {
    exit(){
      PROMPT.close();
    },
    PROMPT:PROMPT,
    process:process
  });
  Object.defineProperty(TOOLBOX, "exit", {
    get(){
      PROMPT.close();
      return null;
    }
  })
  Object.defineProperty(TOOLBOX, "help", {
    get(){
      console.log(STANDARD_HEADER);
      console.log(HELP_LEGEND);
      //var descriptor={
      //  lvl:"library",
      //  books:Object.keys(TOOLBOX),
      //  legend:HELP_HEADER
      //};
      for(var i of Object.keys(TOOLBOX)){
        if(i!="exit"){
          console.log("\t\x1b[7m", i, "\x1b[0m: type="+(typeof TOOLBOX[i]).toUpperCase());
        }
      }
      console.log();
      console.log('\t\x1b[7m exit \x1b[0m: it\'s escaping trapdoor on reading prop, classic exit that exits, write just \"exit\"')
      console.log();
      //console.log(descriptor.books)
      return null;
    }
  })
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
  console.log(" ... ");
  var textTMP=" user-friendly escape sequence of programm... ";
  var outputTMP=`\x1b[1mEXECUTING `;
  for(var i=0;i<textTMP.length;i++){
    outputTMP+=`\x1b[3${i%6+1}m`;
    outputTMP+=textTMP.charAt(i);
  }
  outputTMP+='\x1b[0m';
  console.log(outputTMP);
  console.log(STANDARD_HEADER);
  console.log('Thank you for testing/using/depending/requiring!');
  console.log("\t\t\tBYE!");
  process.exit(0);
}
function ON_PROMPT_LINE(line){
  //line=line.split(" ")
  //switch(){
  //  case 'hello':
  //    console.log('world!');
  //    break;
  //  default:
  //    console.log(`Say what? I might have heard '${line.trim()}'`);
  //    break;
  //}

  //console.log(line);
  //var command=line.shift().trim();
  ///if(TOOLBOX.hasOwnProperty(command)){
    //console.log(TOOLBOX);
  //}else if(command=="help"){

  //}else if(command=="exit"){
  //  PROMPT.close();
  //  return false;
  //}else{
  //  throw `${command} < COMMAND_NOT_EXIST`;
  //}
  //line

  const inputScript = new vm.Script(line);
  vm.createContext(TOOLBOX);
  //for (let i = 0; i < 10; ++i) {
  try{
    console.log(inputScript.runInContext(TOOLBOX));
  }catch(e){
    console.log(e);
  }


  //}
  //console.log(context);
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
