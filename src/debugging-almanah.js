
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

const DEBUGGER={
  get CHECK(){
    if(DEBUGGER.selfExamination)console.log({
      POINT:"debugger-checker",
      has_status_property: DEBUGGER.hasOwnProperty("status"),
      is_called_with_debug_flag: process.argv.includes("--verbose"),
      is_called_with_verbose_flag: process.argv.includes("--debug"),
      argv_array: process.argv
    });
    if(!DEBUGGER.hasOwnProperty("status"))
      DEBUGGER.status=(
        process.argv.includes("--verbose")
        ||
        process.argv.includes("--debug")
      );
    DEBUGGER.selfExamination=false;
    return DEBUGGER.status;
  },
  ON(){
    if(DEBUGGER.selfExamination)console.log({
      POINT:"debugger-on",
      state:(DEBUGGER.status)?"ON":"OFF"
    });
    DEBUGGER.selfExamination=false
    DEBUGGER.status=true
  },
  OFF(){
    if(DEBUGGER.selfExamination)console.log({
      POINT:"debugger-off",
      state:(DEBUGGER.status)?"ON":"OFF"
    });
    DEBUGGER.selfExamination=false
    DEBUGGER.status=false
  },
  selfExamination:false,
  get SELF(){
    DEBUGGER.selfExamination=true;
    return DEBUGGER.proxy;
  },
  proxy:null //before initialization access issue, fixed by setting it below
}
/*

*/
DEBUGGER.proxy=new Proxy(DEBUGGER, {
  get(target, name){
    ///
    if(DEBUGGER.selfExamination)console.log({
      POINT:"before-proxy",
      target,
      name,
      is_debugging_on: DEBUGGER.CHECK,
      has_debugger_property_with_name: DEBUGGER.hasOwnProperty(name),
      is_name_console_method: console[name] instanceof Function
    });
    ///
    var result=()=>null
    ///
    if(DEBUGGER.hasOwnProperty(name)){
      if(DEBUGGER.selfExamination)console.log({
        POINT:"part-of-debugger",
        name
      });
      result=DEBUGGER[name];
    }else if(DEBUGGER.CHECK){
      if(console[name] instanceof Function){
        result=function(...args){
          if(DEBUGGER.selfExamination)console.log({
            POINT:"using-console",
            name,
            arguments:args
          });
          DEBUGGER.selfExamination=false;
          console[name](...args);
        }
      }else{
        result=function(...args){
          if(DEBUGGER.selfExamination)console.log({
            POINT:"unknown-emergency",
            name,
            arguments:args
          });
          DEBUGGER.selfExamination=false;
          console.log({Emergency:name}, ...args);
        }
      }
    }
    if(DEBUGGER.selfExamination)console.log({
      POINT:"returning-result",
      result:result
    });
    if(
      [
        "string",
        "number",
        "bolean",
        "undefined"
      ].includes(typeof result)
    )DEBUGGER.selfExamination=false;
    return result;
  }
});

const GDRR=GeekyDodgeRaportRawr;

module.exports={
  umActually:new Proxy(GDRR, {
    get(target,name){
      var woff=new GDRR(name)
      GDRR.RAPORT=woff;
      return function(...allData){
        woff.complainDescription(...allData);
      }
    }
  }),
  debug:DEBUGGER.proxy,
  GeekyDodgeRaportRawr,
  GDRR
}
