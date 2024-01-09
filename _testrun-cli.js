const TOOLBOX = require('./src/_index.js');

const fs = require('fs');
const readline = require('readline');
const vm = require('vm');

const CLI=new TOOLBOX.CliTool(
  {
    textarts:"./resources/text",
    ptxmls:"./resources/text"
  }
);

const STANDARD_HEADER=CLI.colorize(
  CLI.textart("header-logo"),
  [CLI.reverse, CLI.reset]
);

//const REPOS_INFO=CLI.lines(
//  "",
//  (
//    CLI.TAB()
//    +"    "
//    +CLI.colorize(
//      "NPM:",
//      [CLI.BACK.red,CLI.reset]
//    )+" "
//    +CLI.colorize(
//      "https://www.npmjs.com/package/carnival-toolbox",
//      [CLI.FRONT.red,CLI.reset]
//    )
//  ),
//  (
//    CLI.TAB()
//    +" "
//    +CLI.colorize(
//      "NPM:",
//      [CLI.BACK.red,CLI.reset]
//    )+" "
//    +CLI.colorize(
//      "https://www.npmjs.com/package/carnival-toolbox",
//      [CLI.FRONT.red,CLI.reset]
//    )
//  ),
//);
const REPOS_INFO=CLI.loadPTXML("repos-info");
//const REPOS_INFO=`
//\t    \x1b[41m\x1b[0m \x1b[31m\x1b[0m
//\t \x1b[46mGitHub:\x1b[0m \x1b[36mhttps://github.com/Sarverott/carnival-toolbox\x1b[0m
//
//\t\t\t \x1b[2m~~~ Sett Sarverott @ 2024 ~~~\x1b[0m
//\t\t \x1b[2m~~~ published on terms of MIT license ~~~\x1b[0m
//`

const HELP_LEGEND=CLI.textart("legend")

var PROMPT=null;

//umActually.primeNums("result correct it is not", "opposite site of force it is", "problem i see")


function NEW_PROMPT(){

  Object.assign(TOOLBOX, {
    exit(){
      PROMPT.close();
    },
    PROMPT:PROMPT,
    process:process
  });//umActually.primeNumber("result correct it is not")
  Object.defineProperty(TOOLBOX, "exit", {
    get(){
      PROMPT.close();
      return null;
    }
  });
  Object.defineProperty(TOOLBOX, "help", {
    get(){
      console.log("\t\t # # # ABOUT CARNIVAL TOOLBOX # # #");
      console.log("\t For detailed documentation, and usage guides go to official website of project.");
      console.log();
      console.log(REPOS_INFO);
      console.log();
      console.log(HELP_LEGEND);
      console.log();
      //var descriptor={
      //  lvl:"library",
      //  books:Object.keys(TOOLBOX),
      //  legend:HELP_HEADER
      //};
      for(var i of Object.keys(TOOLBOX)){
        if(i!="exit"){
          var helpPrintLine=[
            ` [${(typeof TOOLBOX[i]).toUpperCase()}]=\t`,
            CLI.colorize(i, [CLI.reverse,CLI.reset])
          ]
          console.log(...helpPrintLine);
          //  "\t\x1b[7m",
          //  i,
          //  "\x1b[0m: type="+().toUpperCase(),
          //
          //);
        }
      }
      console.log();
      console.log('\t\t\x1b[7m help \x1b[0m: prints this informations.')
      console.log();
      console.log('\t\t\x1b[7m roadmap \x1b[0m: displays more sophisticated version of help.')
      console.log();
      console.log('\t\t\x1b[7m exit \x1b[0m: it\'s escaping trapdoor on reading prop, classic exit that exits, write just \"exit\".')
      console.log();
      //console.log(descriptor.books)
      return null;
    }
  });
  Object.defineProperty(TOOLBOX, "roadmap", {
    get(){
      console.log("\t\t ROADMAP OF CARNIVAL TOOLBOX ");
      console.log();

      console.log();
      CLI.colorPrint("--------------", CLI.reverse);
      console.log();

      CLI.colorPrint(
        JSON.stringify(
          TOOLBOX.BOXES,
          null,
          "\t"
        ).replaceAll(
          '"',
          CLI.colorize('"',[CLI.FRONT.red, CLI.FRONT.yellow])
        ).replaceAll(
          ':',
          CLI.colorize(':',[CLI.FRONT.green, CLI.FRONT.yellow])
        ).replaceAll(
          ',',
          CLI.colorize(',',[CLI.FRONT.cyan, CLI.FRONT.yellow])
        ),
        CLI.FRONT.yellow
      );
      console.log();
      CLI.colorPrint("--------------", CLI.reverse);
      console.log();
      //var descriptor={
      //  lvl:"library",
      //  books:Object.keys(TOOLBOX),
      //  legend:HELP_HEADER
      //};
      for(var i of Object.keys(TOOLBOX)){
        if(i!="exit"){
          var helpPrintLine=[
            ' {',
            `type:${
              CLI.colorize(
                (typeof TOOLBOX[i]).toUpperCase(),
                [CLI.BACK.magenta, CLI.reset]
              )
            },`,
            '\t source:',
            CLI.colorize("CORE",[CLI.BACK.green,CLI.reset])
          ]
          for(var j in TOOLBOX.BOXES){
            if(TOOLBOX.BOXES[j].includes(i)){
              helpPrintLine.pop();
              helpPrintLine.push(CLI.colorize(j,[CLI.FRONT.cyan,CLI.reset]));
            }else if(i=="BOXES"||i=="LibraryGuard"){
              helpPrintLine.pop();
              helpPrintLine.push(CLI.colorize("DEPLOYER",[CLI.FRONT.green,CLI.reset]));
            }
          }
          helpPrintLine.push('\t} = ')
          helpPrintLine.push(CLI.colorize(i, [CLI.reverse,CLI.reset]))
          console.log(...helpPrintLine);
          //  "\t\x1b[7m",
          //  i,
          //  "\x1b[0m: type="+().toUpperCase(),
          //
          //);
        }
      }
      console.log();
      //console.log(descriptor.books)
      return null;
    }
  })
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "|~\x1b[44m\x1b[31m ▓▒░ \x1b[0m \x1b[7m CT :: Sandbox lab \x1b[0m \x1b[44m\x1b[31m ░▒▓ \x1b[0m~>"
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
  console.log(REPOS_INFO);
  console.log(STANDARD_HEADER);
  console.log('\tThank you for testing/using/depending/requiring!');
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
  //for (let i = 0; i < 10; ++i) {var textTMP=" user-friendly escape sequence of programm... ";
  //textTMP=" . . . ";
  var outputTMP=' ';
  for(var i=0;i<5;i++){
    outputTMP+=`\x1b[3${Math.floor(Math.random()*5%6+1)}m`;
    outputTMP+='- ';
  }
  console.log(outputTMP+'\x1b[0m');
  //console.log("\x1b[2m . . . \x1b[0m");
  try{
    console.log(inputScript.runInContext(TOOLBOX));
  }catch(e){
    console.log(e);
  }
  outputTMP=' ';
  for(var i=0;i<5;i++){
    outputTMP+=`\x1b[3${Math.floor(Math.random()*6%6+1)}m`;
    outputTMP+='- ';
  }
  console.log(outputTMP+'\x1b[0m');


  //}
  //console.log(context);
  PROMPT.prompt();
}
console.log(STANDARD_HEADER);
console.log(REPOS_INFO);
PROMPT=NEW_PROMPT();
PROMPT.prompt();
