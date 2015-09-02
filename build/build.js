var fs = require('fs');
var djs = require('../d.js');
          require('./app.css.js');

var Build=function(){
	this.compile=function(){
		var jscss= new JsCss();
		var gencss = jscss.js2css(GLOBAL.css);
		//console.log(gencss);
		fs.writeFile("./app.css", gencss, function(err) {
			if(err) {
				return console.log(err);
			}

			//console.log("The file was saved!");
		}); 
	}
}


/**
 Old school type
 */
var JsCss=function(){ 
	this.insertTag= false;
	this.prettyPrint= true;


/**
 * Map<Map<<String>> elem: map of map of CSS strings
 * syntax simplification: _ replaced by -
 * number replaced by numberpx or #number
 * 
 * 
 * syntax:
 * <selector>:{
 * 	<css_attrib>:<cssvalue>
 * }
 * <selector and css_attrib may be experssed as strings when using special char: -.# etc.
 * colors may be written 0xFFFFFF instead of "#FFFFFF"
 * sizes in px may be written as int: 2 is equivalent  of "2px"
 * commons attributes with - may be written with _: border_width is equivalent of "border-width"
 * 
 * no nested class. no media queries for instance
 * 
 */
this.js2css = function(js){
	if (this.insertTag) {
		monstyle=document.createElement('style');
		document.head.appendChild(monstyle);
	}
	var allCss='';
	var curly=this.prettyPrint?'\n}\n':'}';
	
	for (var k in js){
	    var css = k + '{';
		if (k[0]=="@"){
				css += '\n'+this.js2css(js[k]);
				css += curly;
				allCss += css + '\n';
				continue;
		}
			
		for (var l in js[k]){
			
			var prop=l.replace('_','-'); 
			var value=js[k][l];
			if (typeof value === 'number' ){
				if(l.indexOf('color')>=0){
					value ="#"+value.toString(16);
				}else{
					value +="px";
				}
			}
			if (this.prettyPrint) css += '\n\t';
			css += prop + ': ' + value +';';
		}
		css += curly;
		if (this.insertTag) monstyle.sheet.insertRule(css,0);
		//console.log(css);
		allCss += css + '\n';
	}
	return allCss;
}

}

var build=new Build();
build.compile();
