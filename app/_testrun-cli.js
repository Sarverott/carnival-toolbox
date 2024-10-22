const TOOLBOX = require("./src/_index.js");

const fs = require("fs");
const readline = require("readline");
const vm = require("vm");

const CLI = new TOOLBOX.CliTool({
  textarts: "../resources/text",
  ptxmls: "../resources/text",
});

const STANDARD_HEADER = CLI.LOAD_HEAD("small")
  .paint("random", "BACK", ["cyan", "magenta"])
  .shades(CLI.dim, CLI.paintIt(CLI.BACK.black, CLI.FRONT.green))
  .margins({ top: 2, left: 20 }).PRINT;

const INMEDIATE_SUBHEADER =
  CLI.paintIt(CLI.BACK.black) +
  CLI.LOAD_HEAD("medium")
    .paint("random", "FRONT", ["blue", "green"])
    .shades(CLI.FRONT.red)
    .margins({ top: 2, left: 10 }).PRINT;

const COLORFULL_HEADER =
  CLI.paintIt(CLI.FRONT.black) +
  CLI.rainbowize(CLI.textart("big-logo-title"), "BACK");

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
const REPOS_INFO = CLI.loadPTXML("repos-info");
//const REPOS_INFO=`
//\t    \x1b[41m\x1b[0m \x1b[31m\x1b[0m
//\t \x1b[46mGitHub:\x1b[0m \x1b[36mhttps://github.com/Sarverott/carnival-toolbox\x1b[0m
//
//\t\t\t \x1b[2m~~~ Sett Sarverott @ 2024 ~~~\x1b[0m
//\t\t \x1b[2m~~~ published on terms of MIT license ~~~\x1b[0m
//`

const HELP_LEGEND = CLI.textart("legend");

var PROMPT = null;

//umActually.primeNums("result correct it is not", "opposite site of force it is", "problem i see")

function NEW_PROMPT() {
  Object.assign(TOOLBOX, {
    exit() {
      PROMPT.close();
    },
    PROMPT: PROMPT,
    process: process,
  }); //umActually.primeNumber("result correct it is not")
  Object.defineProperty(TOOLBOX, "exit", {
    get() {
      PROMPT.close();
      return null;
    },
  });
  Object.defineProperty(TOOLBOX, "help", {
    get() {
      console.log(INMEDIATE_SUBHEADER);
      console.log();
      console.log(
        `\t\t ${CLI.rainbowize(
          "# # #"
        )} ABOUT CARNIVAL TOOLBOX ${CLI.rainbowize("# # #")}`
      );
      console.log(
        "\t For detailed documentation, and usage guides go to official website of project."
      );
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
      for (var i of Object.keys(TOOLBOX)) {
        if (i != "exit") {
          var helpPrintLine = [
            ` [${(typeof TOOLBOX[i]).toUpperCase()}]=\t`,
            CLI.colorize(i, [CLI.reverse, CLI.reset]),
          ];
          console.log(...helpPrintLine);
          //  "\t\x1b[7m",
          //  i,
          //  "\x1b[0m: type="+().toUpperCase(),
          //
          //);
        }
      }
      console.log();
      console.log("\t\t\x1b[7m help \x1b[0m: prints this informations.");
      console.log();
      console.log(
        "\t\t\x1b[7m roadmap \x1b[0m: displays more sophisticated version of help."
      );
      console.log();
      console.log(
        '\t\t\x1b[7m exit \x1b[0m: it\'s escaping trapdoor on reading prop, classic exit that exits, write just "exit".'
      );
      console.log();
      //console.log(descriptor.books)
      return null;
    },
  });
  Object.defineProperty(TOOLBOX, "roadmap", {
    get() {
      console.log();
      console.log("\t\t ROADMAP OF CARNIVAL TOOLBOX ");
      console.log();

      console.log();
      console.log(CLI.rainbowize("--------------", "BACK"));
      console.log();

      CLI.colorPrint(
        JSON.stringify(TOOLBOX.BOXES, null, "\t")
          .replaceAll('"', CLI.colorize('"', [CLI.FRONT.red, CLI.FRONT.yellow]))
          .replaceAll(
            ":",
            CLI.colorize(":", [CLI.FRONT.green, CLI.FRONT.yellow])
          )
          .replaceAll(
            ",",
            CLI.colorize(",", [CLI.FRONT.cyan, CLI.FRONT.yellow])
          ),
        CLI.FRONT.yellow
      );
      console.log();
      console.log(CLI.rainbowize("--------------", "BACK"));
      console.log();
      //var descriptor={
      //  lvl:"library",
      //  books:Object.keys(TOOLBOX),
      //  legend:HELP_HEADER
      //};
      for (var i of Object.keys(TOOLBOX)) {
        if (i != "exit") {
          var helpPrintLine = [
            " {",
            `type:${CLI.colorize((typeof TOOLBOX[i]).toUpperCase(), [
              CLI.BACK.magenta,
              CLI.reset,
            ])},`,
            "\t source:",
            CLI.colorize("CORE", [CLI.BACK.green, CLI.reset]),
          ];
          for (var j in TOOLBOX.BOXES) {
            if (TOOLBOX.BOXES[j].includes(i)) {
              helpPrintLine.pop();
              helpPrintLine.push(CLI.colorize(j, [CLI.FRONT.cyan, CLI.reset]));
            } else if (i == "BOXES" || i == "LibraryGuard") {
              helpPrintLine.pop();
              helpPrintLine.push(
                CLI.colorize("DEPLOYER", [CLI.FRONT.green, CLI.reset])
              );
            }
          }
          helpPrintLine.push("\t} = ");
          helpPrintLine.push(CLI.colorize(i, [CLI.reverse, CLI.reset]));
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
    },
  });
  return readline
    .createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `: ${CLI.colorize("@~~~", [
        CLI.FRONT.gray,
        CLI.reset,
      ])} ${CLI.colorize(CLI.colorize("▓▒░", [CLI.FRONT.red, CLI.reset]), [
        CLI.blink,
        CLI.reset,
      ])} CarnivalToolbox ${CLI.colorize(
        CLI.colorize("::", [CLI.FRONT.green, CLI.reset]),
        [CLI.blink, CLI.reset]
      )} SandboxLab ${CLI.colorize(
        CLI.colorize("░▒▓", [CLI.FRONT.blue, CLI.reset]),
        [CLI.blink, CLI.reset]
      )} ${CLI.colorize("~~~>", [CLI.FRONT.gray, CLI.reset])} `,
    })
    .on("line", ON_PROMPT_LINE)
    .on("close", ON_PROMPT_CLOSED);
}
function ON_PROMPT_CLOSED() {
  console.log("\n ... \n");
  console.log(
    `\x1b[1mEXECUTING  ${CLI.rainbowize(
      "user-friendly escape sequence of programm..."
    )} `
  );
  console.log(REPOS_INFO);
  console.log(COLORFULL_HEADER);
  console.log("\n\tThank you for testing/using/depending/requiring!");
  console.log("\t\t\tBYE!\n");
  process.exit(0);
}
function ON_PROMPT_LINE(line) {
  CLI.ring();
  //process.stdout.write(CLI.paintIt(CLI.reset));
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
  console.log(CLI.rainbowize(" - - - - - "));

  try {
    console.log(inputScript.runInContext(TOOLBOX));
  } catch (e) {
    console.log(e);
  }

  console.log(CLI.rainbowize(" - - - - - "));

  //}
  //console.log(context);
  PROMPT.prompt();
}
console.clear();
console.log(STANDARD_HEADER);
console.log(REPOS_INFO);
PROMPT = NEW_PROMPT();
PROMPT.prompt();
