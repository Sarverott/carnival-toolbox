var kebabcase=[
  (i)=>i.split("-"),
  (o)=>o.map((x)=>x.toLowerCase()).join("-")
];
var pascalcase=[
  function(i){
    var o=[""], x=i.length;
    //console.log(i);
    do{
      o[0]=i[--x]+o[0];
      if(
        x
        &&
        i.charCodeAt(x)>59
        &&
        i.charCodeAt(x)<91
      )o.unshift("");
    }while(x);
    return o.map((x)=>x.toLowerCase());
  },
  (o)=>o.map((x)=>x[0].toUpperCase()+x.substr(1).toLowerCase()).join(""),
];
var camelcase=[
  function(i){
    var o=[""], x=i.length;
    do{
      o[0]=i[--x]+o[0];
      if(x&&i.charCodeAt(x)>59&&i.charCodeAt(x)<91)o.unshift("");
    }while(x);
    return o.map((x)=>x.toLowerCase());
  },
  (o)=>o.map((x, k)=>(k>0)?x[0].toUpperCase()+x.substr(1).toLowerCase():x.toLowerCase()).join(""),
];
var snakecase=[
  (i)=>i.split("_"),
  (o)=>o.map((x)=>x.toLowerCase()).join("_")
];
var snakecasecabs=[
  (i)=>i.split("_"),
  (o)=>o.map((x)=>x.toUpperCase()).join("_")
];
var initialcase=[
  function(i){throw "INITIAL_CASE_IS_ONEWAY_METHOD!"},
  (o)=>o.map((x)=>x[0].toLowerCase()).join("")
];
var initialcasecabs=[
  function(i){throw "INITIAL_CASE_IS_ONEWAY_METHOD!"},
  (o)=>o.map((x)=>x[0].toUpperCase()).join("")
];

var caseTransformers={
  initialcasecabs,
  initialcase,
  snakecasecabs,
  snakecase,
  camelcase,
  pascalcase,
  kebabcase
};

class Namespacer{
  constructor(input, setup={}){
    this.scope="single";
    this.input=input;
    this.caseFrom=null;
    this.caseInto=null;
    this.output=null;
    Object.assign(this, setup);
  }
  from(casename){
    this.caseFrom=caseTransformers[casename][0];
    return this;
  }
  to(casename){
    this.caseInto=caseTransformers[casename][1];
    return this;
  }
  get GO(){
    this.transfer();
    return this.output;
  }
  transfer(){
    this.output=this.caseInto(
      this.caseFrom(
        this.input
      )
    );
  }
}

function capitalFirst(str){
  return str.charAt(0).toUpperCase+str.slice(1);
}

function changeCase(input){
  return new Namespacer(input);
}

module.exports={
  capitalFirst,
  Namespacer,
  changeCase,
  caseTransformers
};
