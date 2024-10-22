//https://gist.github.com/Sarverott/abfa3442aa90afb97fb0fdb4e3f08025#file-random-string-v1-js
function randomString_V1(
  len=9,
  matrix='qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_-.#@'
){
  var ret='';
	for(var i=0;i<len;i++){
		ret+=matrix.charAt(Math.floor(Math.random()*matrix.length));
	}
	return ret;
}
//https://gist.github.com/Sarverott/abfa3442aa90afb97fb0fdb4e3f08025#file-random-string-v2-js
function randomString_V2(
  l=15,
  F="!".charCodeAt(0),
  L="~".charCodeAt(0)
){
	var o="";
	while(l--)
    o+=String.fromCharCode(
      Math.floor(
        Math.random()
        *
        (L-F)
        +
        F
      )
    );
	  return o;
}
//https://gist.github.com/Sarverott/abfa3442aa90afb97fb0fdb4e3f08025#file-random-string-v3-js
function randomString_V3(
  l=15,
  F="!".charCodeAt(0),
  L="~".charCodeAt(0)
){
  var a=new Array(l);
  var r=function(x){
    //console.log(Math.random()*(L-F)+F);
    return Math.random()*(L-F)+F;
  }
  var o=a.fill(0).map(r);
  return String.fromCharCode(...o);
}
//https://gist.github.com/Sarverott/abfa3442aa90afb97fb0fdb4e3f08025#file-random-string-v4-js
function randomString_V4(
  l=15,
  F="!",
  L="~"
){
  return String.fromCharCode(
    ...Array(l)
    .fill(0)
    .map(function(){
      return Math.random()*(L.charCodeAt(0)-F.charCodeAt(0))+F.charCodeAt(0);
    })
  );
}
//this will close all in one easy-to-use function
function randStr(...args){
  var versionChoice="v1";
  if(typeof args[0] == "string") versionChoice = args.shift();
  return {
    v1:randomString_V1,
    v2:randomString_V2,
    v3:randomString_V3,
    v4:randomString_V4
  }[versionChoice](...args);
}

function arrayLottery(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}



module.exports={randStr, arrayLottery}
