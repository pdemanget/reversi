// source file for css generation
var debug=0;
var baseSize=25;
var lgreen=0x5F5;
var landscape=false;
var tr=false;


var landscapeMacro=function(landscape){
	return  {	
		h1:{
			 text_align: landscape?"right":"center",
			 //pour paysage
			 //-text-align
			 right:landscape?0:"auto",
			 //float: landscape?"right":"none",
			 position: landscape?"absolute":"relative",
			 transition: tr?"all 2s":"none"
		},
		".btnbar":{
			left: landscape?"auto":0,
			top: landscape?0:"auto",
			padding_top: landscape?50:5,
			transition: tr?"all 2s":"none"
		},
		".btn": {
			display: landscape?"block":"auto",
			//transition: "all 2s"
		}
	};
};


/**
 * diff d'object jscss
 * retourne la sous-partie de js1 spécifique à js1 i.e. js1 - js2.
 * relancer dans l'autre sens pour la partie spécifique à js2.
 */
var diff=function(js1,js2){
	var diff1={}
	for (var k in js1){
		for (var l in js1[k]){
			if (!js2[k] || js1[k][l] != js2[k][l]){//test si non existence?
				//creer
				diff1[k]=diff1[k]||{};
				diff1[k][l]=js1[k][l];
			}
		}
	}
	return diff1;
};
/*
function test1() {
	console.log(diff({h1:{color:"blue"},h2:{color:"blue"},h3:{color:"blue"}},{h2:{color:"blue"},h3:{color:"red"}}));
};
test1();
*/
var cssMacro = function(baseSize) {
	return {
	"html, body": {
	 width: "100%",
	 height: "100%",
	 margin: 0,
	 font: "bold 20px arial"
	},
	/*
	body:{
		transform: "scale(2)"
	},*/
	h1:{
	 background: "black",
	 color: 0xFFFFFF,
	 //text_align: landscape?"right":"center",
	 margin: 0,
	 
	 //pour paysage
	 //-text-align
//	 right:landscape?0:"auto",
//	 float: landscape?"right":"none",
//	 position: landscape?"fixed":"relative",
	 z_index: "2",
	 font_size: 34,
	 padding_right: 4
	},
	table: {
	 margin: 5,
	 border_width:1,
	 border_style:"solid",
	 border_color:"black",
	 border_collapse:"collapse",
	 margin_left:"auto", 
     margin_right:"auto"
	},

	td: { 
	 border_width:1,
	 border_style:"solid",
	 border_color:"black",
	 width: baseSize+4,
	 height: baseSize+4,
	 background_color: 0x22DD22
	},
	img: {
	 width: baseSize+"px",
	 height: baseSize+"px"
	},
	".player1": {
		width: baseSize+"px",
		height: baseSize+"px",
		border: "2px solid black",
		border_radius: baseSize,
		background_color: "black"
	},
	".player2": {
		width: baseSize+"px",
		height: baseSize+"px",
		border: "2px solid black",
		"border-radius": baseSize,
		"background-color": "white"
	},
	"#message": {
	 border:"1px solid black",
	 text_align:"center",
	 width: 8*(baseSize+7),
	 height: 75,
	 color: 0x5F9EA0,
	 font: debug?"200 10px monospace":"bold 20px arial",
	 overflow:"auto",
	 margin_top: 5,
	 margin_left: "auto",
     margin_right: "auto"
	},
	"#gameover": {
	 //border:"1px solid black",
	 position: "absolute",
	 top: 125,
	 left: 0,
	 right: 0,
	 margin: "0 auto",
     padding: 10,
	 max_width: 130,
	 background_color: "rgba(127,255,127,0.75)",
	 //box_shadow: "0px 0px 25px #5F5",
	 color: 0,
	 text_align: "center",
	 font: "900 30px arial,sans-serif",
	 display: "none",
	},
	".btnbar": {
		text_align:"center",
		background_color: "black",
		position: "fixed",
//		left: landscape?"auto":0,
//		top: landscape?0:"auto",
//		padding_top: landscape?50:5,
		right: 0,
		bottom: 0
		
		//pour paysage:
		//-left
		//+top:0
	},
	".btn": {
		text_align:"center",
		background_color: lgreen,
		border: "2px solid #050",
		border_radius:7,
		margin: 5,
		font: "bold 25px arial",
		text_transform: "uppercase",
		display: landscape?"block":"auto",
	},
	".window": {
		position: "fixed",
		top:0,
		bottom:0,
		left:0,
		right:0,
		background_color:0xFFFFFF
	},
	".centered": {
		margin_left: "auto",
		margin_right: "auto",
		width: 300
	},
	label: {
		width: 170,
		display: "inline-block"
	},
	select: {
		font: "bold 20px arial",
		width: 120
	}
};
};

//pour toutes les tailles, calculer les macros, faire le diff, faire la media pour la taille
var sizedMacro=function(baseSize){
	//calculer la css ref, boucler sur les autres, faire une règle par taille + une règle référence.
}
/*
The design is frameworkless. need to adapt to different resolutions:
phone: 480x800?
* on prend 400 comme base minimum en hauteur et largeur, le landscape s'adpate pour prendre le pire des 2
*  puis on étend à 800, 1600 ça devrais suffire.
* 
*/

var css400=cssMacro(25);
var css800=cssMacro(50);
var css1600=cssMacro(100);
//on compare l 2 premiers pour avoir les specifiques, communs
var css400min=diff(css400,css800);
var cssCommun=diff(css400,css400min);
css800=diff(css800, cssCommun);
css1600=diff(css1600, cssCommun);

var css200=diff(cssMacro(10),cssCommun);

var css = {
	"@media screen and ( max-width: 400px ) and ( max-width: 400px ) ":css200,
	
	"@media screen and ( max-width: 800px ) and ( max-width: 800px ) ":css400,
	"@media screen and ( min-width: 800px ) and ( min-width: 800px ) ":css800,
	"@media screen and ( min-width: 1600px ) and ( min-width: 1600x ) ":css1600,
	"@media screen and (orientation:landscape)": landscapeMacro(true),
	"@media screen and (orientation:portrait)": landscapeMacro(false)
}
d.extend(css,cssCommun);
 
if (GLOBAL) GLOBAL.css=css;
