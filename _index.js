if(require.main===module){
  require("./_testrun-cli.js");
}else{
  module.exports=require('./src/_index.js');
}
