var kebabcase=[
  (i)=>i.split("-"),
  (o)=>o.map((x)=>x.toLowerCase()).join("-")
];
var pascalcase=[
  function(i){
    var o=[""], x=i.length;
    do{
      o[0]=i[--x]+o[0];
      if(
        x
        &&
        i.charcodeAt(x)>59
        &&
        i.charcodeAt(x)<91
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
      if(x&&i.charcodeAt(x)>59&&i.charcodeAt(x)<91)o.unshift("");
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

var transformers={
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
    this.caseFrom=transformers[casename][0];
    return this;
  }
  to(casename){
    this.caseInto=transformers[casename][1];
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

function transform(input){
  return new Namespacer(input);
}

module.exports={
  Namespacer,
  transform,
  initialcasecabs,
  initialcase,
  snakecasecabs,
  snakecase,
  camelcase,
  pascalcase,
  kebabcase,
  transformers
};
