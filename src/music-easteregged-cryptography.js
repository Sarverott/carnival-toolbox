/*
  Sett Sarverott @ 2019
  ***~~~~~~~~***
  plt tlp crypto functions
*/
const Fibonacci = require('./fibonacci.js');
/*
{
  next:function(){
    var tmp=this.last;
		this.last+=this.beforeLast;
		this.beforeLast=tmp;
  },
  last:1,
  beforeLast:1
}
*/
function purpleLightTimekeeper(data, key){
  //console.log(data);
	var  fib=new Fibonacci();
	var encoded="";
	for(var i=0;i<data.length;i++){
    //console.log(data.charCodeAt[i]-key.charCodeAt[fib.last%key.length]);
		var tmp=data.charCodeAt(i)-key.charCodeAt(fib.last%key.length);
		(tmp<0)?tmp+=256:true;
		encoded+=String.fromCharCode(tmp);
		fib.next();
	}
	return encoded;
}
function timekeepLightPurpler(data, key){
	var  fib=new Fibonacci();
	var decoded="";
	for(var i=0;i<data.length;i++){
		var tmp=data.charCodeAt(i)+key.charCodeAt(fib.last%key.length);
		(tmp>255)?tmp-=256:true;
		decoded+=String.fromCharCode(tmp);
		fib.next()
	}
	return decoded;
}

module.exports={
  plt:purpleLightTimekeeper,
  purpleLightTimekeeper,
  tlp:timekeepLightPurpler,
  timekeepLightPurpler
}
