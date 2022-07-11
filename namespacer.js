class Namespacer{
  constructor(setup={}){
    this.scope="single";
    this.input=null;
    this.caseFrom=null;
    this.caseInto=null;
    this.output=null;
    Object.assign(this, setup);
  }
  static oneName(in){
    return new Namespacer();
  }
  from(casename){
    this.caseFrom=Namespacer.caseTransformers[casename][0];
    return this;
  }
  to(casename){
    this.caseInto=Namespacer.caseTransformers[casename][1];
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
Namespacer.caseTransformers={
  kebabcase:[
    (i)=>i.split("-"),
    (o)=>o.map((x)=>x.toLowerCase()).join("-")
  ],
  pascalcase:[
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
  ],
  camelcase:[
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
    (o)=>o.map((x, k)=>(k>0)?x[0].toUpperCase()+x.substr(1).toLowerCase():x.toLowerCase()).join(""),
  ],
  snakecase:[
    (i)=>i.split("_"),
    (o)=>o.map((x)=>x.toLowerCase()).join("_")
  ],
  snakecasecabs:[
    (i)=>i.split("_"),
    (o)=>o.map((x)=>x.toUpperCase()).join("_")
  ],
  initialcase:[
    function(i){throw "INITIAL_CASE_IS_ONEWAY_METHOD!"},
    (o)=>o.map((x)=>x[0].toLowerCase()).join("")
  ],
  initialcasecabs:[
    function(i){throw "INITIAL_CASE_IS_ONEWAY_METHOD!"},
    (o)=>o.map((x)=>x[0].toUpperCase()).join("")
  ]
};
module.exports=Namespacer;
