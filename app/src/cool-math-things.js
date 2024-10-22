class Fibonacci{
	constructor(){
		this.last=1;
		this.beforeLast=1;
	}
	next(){
		var tmp=this.last;
		this.last+=this.beforeLast;
		this.beforeLast=tmp;
	}
}
/*
prime number finder
Sett Sarverott 2022
*/
//https://gist.github.com/Sarverott/c37b983be2253882844c4b010bd9e240
function powersOfTwo( //PREVIOUS primeNumber but it's fundamentally broken; it should work in opposite to what it dooooooo
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
function primeNumber(limit, mode="reach"){ //modes: reach | count
  /*
  devlog: comments are old code, use notes or algorithm:
  -preset empty primes array and one in testednumber
  */
  var result=[];
  var testNum=0;
  var i=0;
  while(i<limit){ //-repeat looping until reach wanted count or to given number
    testNum++ //-increment the testednumber
    var testflag=true; //(just keeping in mind obviouses: first loop has zero tests, it can't ligicjokering)

    for(
      var j=1;
      (
        j<result.length
        &&
        testflag //-repeat for all in array is testednumber modulo prime equal zero #devlog: JINX
        &&
        !testNum/2<result[j]//---[OPTIMALISER]end if primes starts to be greater than half of testednumber - skip impossible to return true tests
      );
      j++
    ) testflag = testNum % result[j] != 0 //-repeat for all in array is testednumber modulo prime equal zero #devlog: JINX

    if(testflag){ //-if all tests true result add testednumber value to primes #devlog: false into true makes work easier here
      result.push(testNum);
      if(mode=="count") i++ // limit is needed count of resulted numbers
    }

    if(mode=="reach") i++; //limit is max limit, all resultet must be lesser than limit
  }
  return result; // and GITARA SIEMA
}

module.exports={
	primeNumber,
	powersOfTwo,
	Fibonacci
};
