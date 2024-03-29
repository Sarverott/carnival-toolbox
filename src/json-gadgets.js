const fs=require("fs");

function loadJSON(filepath, customSetup={}){
  var output=null;
  try{
    output=JSON.parse(
      fs.readFileSync(
        filepath,
        customSetup
      )
    );
  }catch(e){
    console.group("JSON file read error");
    console.error(e);
    console.log(filepath);
    console.log(customSetup);
    console.groupEnd();
  }
  return output;
}
function saveJSON(filepath, context, customSetup={}){
  //var output=null;
  //customSetup=Object.assign({space:null, replacer:null})
  try{
    fs.writeFileSync(
      filepath,
      JSON.stringify(
        context,
        customSetup.replacer||null,
        customSetup.space||null
      ),
      customSetup
    );
  }catch(e){
    console.group("JSON write read error");
    console.error(e);
    console.log(filepath);
    console.log(context);
    console.log(customSetup);
    console.groupEnd();
  }
  //return output;
}

class JsonFile{
  constructor(filepath, customSetup={}){
    this.path=filepath;
    this.setup={
      createNonExisting:false,
      replacer:null,
      space:null,
      encoding:"utf8"
    };
    Object.assign(this.setup, customSetup);
    this.safeCreate(filepath);
    //this.watcher=null;
  }
  //live
  //close(){

  //}
  safeCreate(filepath){
    if(!fs.existsSync(filepath)){
      if(this.setup.createNonExisting){
        fs.writeFileSync(filepath, "0", this.setup);
      }else{
        throw "JSON_FILE_EXISTANCE_ERROR"
      }
    }
  }
  get content(){
    return loadJSON(this.path, this.setup);
  }
  set content(data){
    saveJSON(this.path, data, this.setup);
  }
}

function configFile(...args){
  return new JsonFile(...args);
}
module.exports={
  configFile,
  JsonFile,
  loadJSON,
  saveJSON
};
