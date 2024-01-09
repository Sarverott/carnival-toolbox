const readline = require('readline');
const repl = require('repl');
const fs = require('fs');
const path = require('path');

const {arrayLottery} = require('./random-stuff.js');
const {xmlEscCodesReplace, xmlTagsReplace} = require("./xml-toys.js");

class CliTool{
  constructor(setup={textarts:"./"}){
    Object.assign(this, setup);
    Object.assign(this, colorCodes);
    //this.colorPrint=colorPrint;
    //this.colorize=ESC_Color;
  }
  setPath(name, newpath){
    this.paths[name]=newpath;
  }
  textart(name){
    return fs.readFileSync(
      path.join(
        this.textarts,
        `${name}.txt`
      )
    ).toString("utf8").trim();
  }
  TAB(count=1){
    return Array(count).fill("\t").join("");
  }
  NL(count=1){
    return Array(count).fill("\n").join("");
  }
  BELL(count=1){
    return Array(count).fill("\b").join("");
  }
  colorPrint(data, code=7){
    console.log(this.colorize(data, [code,0]));
  }
  colorize(data, codes=[7,0]){
    return `\x1b[${codes[0].toString()}m${data}\x1b[${codes[1].toString()}m`;
  }
  paintIt(...codes){
    return codes.map(
      (colorcode)=>`\x1b[${colorcode}m`
    ).join("");
  }
  rainbowize(
    data,
    mode="FRONT",
    opts={
      //useColors:null,
      //banCollors:["black", "gray", "white"]
    }
  ){
    var result = ``;
    var banColors = ["black", "gray", "white"];
    if(opts.hasOwnProperty("banColors")) banColors = opts.banColors;
    var useColors = Object.keys(colorCodes.FACTORS).filter(
      (colorname)=> !banColors.includes(colorname)
    );
    if(opts.hasOwnProperty("useColors")) useColors = opts.useColors;
    for(var i=0; i<data.length; i++){
      if(
        ["\n","\r"].includes(data.charAt(i))
      ){
        result += `\x1b[${colorCodes[mode].black}m`;
        //result += `\x1b[${colorCodes.reset}m`;
      }else{
        result += `\x1b[${colorCodes[mode][arrayLottery(useColors)]}m`;
      }
      result += data.charAt(i);
    }
    result += '\x1b[0m';
    return result;
  }
  lines(...lines){
    return lines.join("\n");
  }
  static get PTXML_REPLACE_COLORS(){
    const result={};
    for(var i in colorCodes){
      if(typeof colorCodes[i] == "number"){
        result[i]=[
          `\x1b[${colorCodes[i].toString()}m`,
          '\x1b[0m'
        ];
      }
    }
    for(var i in colorCodes.FRONT){
      result["f-"+i]=[
        `\x1b[${colorCodes.FRONT[i].toString()}m`,
        '\x1b[0m'
      ];
    }
    for(var i in colorCodes.BACK){
      result["b-"+i]=[
        `\x1b[${colorCodes.BACK[i].toString()}m`,
        '\x1b[0m'
      ];
    }
    return result;
  }
  ring(i=1){
    process.stdout.write(this.BELL(i));
  }
  loadPTXML(name){
    var fileContent=fs.readFileSync(
      path.join(
        this.ptxmls,
        `${name}.ptxml`
      )
    ).toString("utf8").trim();
    fileContent=xmlEscCodesReplace(fileContent);
    fileContent=xmlTagsReplace(fileContent, CliTool.PTXML_REPLACE_COLORS);
    return fileContent;
  }
}
//based on answer on stack overflow
//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color#answer-41407246
//about colors in terminal, escape codes and nodejs
//thank you Bud Damyanov and Raine Revere
const colorCodes={
  reset:0,
  bright:1,
  dim:2,
  underscore:4,
  blink:5,
  reverse:7,
  hidden:8,
  get FRONT(){
    const result={}
    for(const [colorname, code] of Object.entries(this.FACTORS)){
      result[colorname]=code+30;
    }
    return result;
  },
  get BACK(){
    const result={}
    for(const [colorname, code] of Object.entries(this.FACTORS)){
      result[colorname]=code+40;
    }
    return result;
  },
  FACTORS:{
    black:0,
    red:1,
    green:2,
    yellow:3,
    blue:4,
    magenta:5,
    cyan:6,
    white:7,
    gray:60
  }
}

module.exports={
  //TAB:'\t',
  //ENDL:'\n\r',
  //COLORCODES:colorCodes,
  CliTool
}
