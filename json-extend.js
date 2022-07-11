const fs=require("fs")
JSON.file=(filepath)=>{
  path:filepath,
  parseJson:[],
  readFs:[],
  writeFs:[],
  stringifyJson:[],
  setup(...arrayKeyVal){
    for(var i in akv){
      this[
        akv[i][0]
      ]=akv[i][1];
    });
  },
  get content(){
    return JSON.parse(
      fs.readFileSync(
        this.path,
        ...this.readFs
      ),
      ...this.parseJson
    );
  },
  set content(data){
    fs.writeFileSync(
      this.filepath,
      JSON.stringify(
        data,
        ...this.stringifyJson
      ),
      ...this.writeFs
    );
  }
};
module.exports=JSON;
