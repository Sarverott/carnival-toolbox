
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


const GDRR=GeekyDodgeRaportRawr;

module.exports={
  umActually:new Proxy(GDRR, {
    get(target,name){
      var woff=new GeekyDodgeRaportRawr(name)
      GeekyDodgeRaportRawr.RAPORT=woff;
      return function(...allData){
        woff.complainDescription(...allData);
      }
    }
  }),
  GeekyDodgeRaportRawr,
  GDRR
}
