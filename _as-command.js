const TOOLBOX = require('./src/_index.js');

const fs = require('fs');
//const readline = require('readline');
const vm = require('vm');

const REF_BOOK={
  MANUALS(){
    console.log(REF_BOOK);
  },
  list:{},
  loadSynonyms(){
    for(var itemname in TOOLBOX){
      REF_BOOK.list[
        TOOLBOX.changeCase(itemname).from("camelcase").to("kebabcase").GO
      ]=TOOLBOX[itemname];
      REF_BOOK.list[
        TOOLBOX.changeCase(itemname).from("camelcase").to("snakecase").GO
      ]=TOOLBOX[itemname];
      REF_BOOK.list[
        TOOLBOX.changeCase(itemname).from("camelcase").to("snakecasecabs").GO
      ]=TOOLBOX[itemname];
      REF_BOOK.list[
        TOOLBOX.changeCase(itemname).from("snakecasecabs").to("kebabcase").GO
      ]=TOOLBOX[itemname];
      REF_BOOK.list[
        TOOLBOX.changeCase(itemname).from("camelcase").to("initialcase").GO
      ]=TOOLBOX[itemname];
      REF_BOOK.list[
        TOOLBOX.changeCase(itemname).from("camelcase").to("initialcasecabs").GO
      ]=TOOLBOX[itemname];
    }
    return REF_BOOK;
  },
  EXISTS(funct){
    return REF_BOOK.list.hasOwnProperty(funct);
  },
  GET(name){
    return REF_BOOK.list[name];
  }
}

REF_BOOK.loadSynonyms();

function EXECUTE(args, flags, paths){
  if(
    flags.includes("-h")
    ||
    flags.includes("--help")
  ){
    REF_BOOK.MANUALS();
  }
  const ACTION=args.shift().toLowerCase()
  const FUNCT=args.shift()
  var exitcode=0;
  switch(ACTION){
    case "help":
      REF_BOOK.MANUALS();
    break;
    case "return":
      if(REF_BOOK.EXISTS(FUNCT)){

      }else{
        console.error(`ERROR_RETURN_INVOKE: "${FUNCT}" is not part of carnival toolbox`)
      }
      //PRINT_RETURN()
    break;
    case "void":
      if(REF_BOOK.EXISTS(FUNCT)){

      }else{
        console.error(`ERROR_VOID_INVOKE: "${FUNCT}" is not part of carnival toolbox`)
      }
    break;
    case "exec":

    break;
  }
  process.exit(exitcode);
}

module.exports=EXECUTE
