const TOOLBOX = require('./src/_index.js');


if(require.main===module){

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
  `

  const REPOS_INFO=`
  \t    \x1b[41mNPM:\x1b[0m \x1b[31mhttps://www.npmjs.com/package/carnival-toolbox\x1b[0m
  \t \x1b[46mGitHub:\x1b[0m \x1b[36mhttps://github.com/Sarverott/carnival-toolbox\x1b[0m

  \t\t\t \x1b[2m~~~ Sett Sarverott @ 2024 ~~~\x1b[0m
  \t\t \x1b[2m~~~ published on terms of MIT license ~~~\x1b[0m
  `

  const HELP_LEGEND=`
  LEGEND:

  Hi there!
  write one of these from list (case sensitive) in prompt,
  it's sandboxed code evaluator, so JS is also accepted.

  `

  var PROMPT=null;

  //umActually.primeNums("result correct it is not", "opposite site of force it is", "problem i see")

  class GeekyDodgeRaportRawr{
    static get RAPORT(){
      if(
        !GeekyDodgeRaportRawr.hasOwnProperty(
          "RAPORT_CHOIR"
        )
      )GeekyDodgeRaportRawr.RAPORT_CHOIR=[];
      return [...GeekyDodgeRaportRawr.RAPORT_CHOIR];
    }
    static set RAPORT(dataIn){
      if(
        !GeekyDodgeRaportRawr.hasOwnProperty(
          "RAPORT_CHOIR"
        )
      )GeekyDodgeRaportRawr.RAPORT_CHOIR=[];
      GeekyDodgeRaportRawr.RAPORT_CHOIR.push(dataIn);
    }
    constructor(whatTheBark){
      this.TARGET=whatTheBark;
    }
    complainDescription(...almightWisdomOfTheNerd){
      console.log("BEGIN BARK", this.TARGET)
      for(var i of almightWisdomOfTheNerd){
        console.log("\x1b[0m\x1b[5m<<<BARK<<<\x1b[0m\x1b[4m", i)
      }
      console.log("\x1b[0mEND BARK", this.TARGET)
      this.BARKLLADA=almightWisdomOfTheNerd;
      console.log("bug recorded to local debugger variable!")
    }
    export(){}
  }

  var GDRR=GeekyDodgeRaportRawr;

  function NEW_PROMPT(){

    Object.assign(TOOLBOX, {
      exit(){
        PROMPT.close();
      },
      umActually:new Proxy(GDRR, {
        get(target,name){
          var woff=new GeekyDodgeRaportRawr(name)
          GeekyDodgeRaportRawr.RAPORT=woff;
          return function(...allData){
            woff.complainDescription(...allData);
          }
        }
      }),
      PROMPT:PROMPT,
      process:process,
      GeekyDodgeRaportRawr:GeekyDodgeRaportRawr,
      GDRR:GDRR
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
        console.log(REPOS_INFO);
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
  function functionName() {

  }
  console.log(STANDARD_HEADER);
  console.log(REPOS_INFO);
  PROMPT=NEW_PROMPT();
  PROMPT.prompt();
}else{
  module.exports=TOOLBOX;
}
