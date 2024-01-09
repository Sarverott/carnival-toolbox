class LibraryGuard{
  constructor(){
    this.LibraryGuard=LibraryGuard;
    this.BOXES={}
  }
  set load(boxName){
    const extendingTools=require(`./${boxName}.js`)
    Object.assign(this, extendingTools);
    this.BOXES[boxName]=Object.keys(extendingTools);
  }
}

const CARNIVAL=new LibraryGuard();

CARNIVAL.load="case-gadgets";
CARNIVAL.load="json-gadgets";
CARNIVAL.load='random-string';
CARNIVAL.load='cool-math-things';
CARNIVAL.load='custom-cryptography';
CARNIVAL.load='terminal-tricks';
CARNIVAL.load='xml-toys';
CARNIVAL.load='debugging-almanah';

module.exports=CARNIVAL;
