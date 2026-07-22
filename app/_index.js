if(require.main!==module){
  module.exports=require('./src/_index.js');
}else{
  const commandPaths=process.argv.filter(
    (item)=>item.charAt(0)=="/"
  );
  const commandFlags=process.argv.filter(
    (item)=>item.charAt(0)=="-"
  );
  const commandArgs=process.argv.filter(
    (item)=>!(
      commandFlags.includes(item)
      ||
      commandPaths.includes(item)
    )
  )
  if(commandArgs.length>0){
    require("./_as-command.js")(commandArgs, commandFlags, commandPaths);
  }else{
    require("./_testrun-cli.js");
  }
}
