module.exports=class Fibonacci{
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
