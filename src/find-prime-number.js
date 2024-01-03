/*
prime number finder
Sett Sarverott 2022
*/
//https://gist.github.com/Sarverott/c37b983be2253882844c4b010bd9e240
function primeNumber(
  endingNumber=100,
  withFinderShift=false
){
  var ret=[];
  var i=0;
  while(endingNumber-(++i)){
    var flag=true;
    for(var j in ret)
        if(i%ret[j])flag=false;
    
    if(flag){
      ret.push(i);
      if(withFinderShift)
        endingNumber++;
    }
  }
  if(withFinderShift)
    ret={
      limit:endingNumber,
      array:ret
    };
  return ret;
}
module.exports=primeNumber;
