/*
prime number finder
Sett Sarverott 2022
*/
//https://gist.github.com/Sarverott/c37b983be2253882844c4b010bd9e240
/*
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

    if(!flag){
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
*/
function primeNumber(limit, mode="reach"){ //modes: reach | count
  /*
  algorithm:
  -preset empty primes array and one in testednumber
  -increment the testednumber ###looping jump here<<<
  -repeat for all in array is testednumber modulo prime equal zero
    ---[OPTIMALISER]end if primes starts to be greater than half of testednumber - skip impossible to return true tests
  -if all tests false result add testednumber value to primes (just keeping in mind obviouses: first loop has zero tests, it can't ligicjokering)
  -repeat looping until reach wanted count or to given number
  */
  var result=[];
  var testNum=0;
  var i=0;
  while(i<limit){
    testNum++
    var testflag=true;
    for(var j=1;j<result.length&&testflag;j++)
      testflag=testNum%result[j]!=0
    if(testflag){
      result.push(testNum);
      if(mode=="count")
        i++
    }
    if(mode=="reach")
      i++;
  }
  return result;
}
module.exports=primeNumber;
