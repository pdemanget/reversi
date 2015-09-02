// source file for css generation
var debug=0;
var baseSize=25;
var lgreen=0x5F5;
var landscape=false;
var tr=false;
/**
 *
 * résolutions test 480x300 en mode landscape, baseSize=25 
 * 
 **/

var landscapeMacro=function(landscape){
	var res = {	
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
			padding_top: landscape?100:5,
			transition: tr?"all 2s":"none"
		},
		".btn": {
			display: landscape?"block":"auto",
			width:landscape?"94%":"auto"
			//transition: "all 2s"
		},
		".centerGame": {
			margin_left:landscape?"10px":"auto", 
			margin_right:"auto"
		},
		".centered": {
			margin_left: "auto",
			margin_right: "auto",
			padding_right:landscape?"10px":"inherited"
		},
	};
	//console.log (res);
	return res;
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
	var res = {
	"html, body": {
	 width: "100%",
	 height: "100%",
	 margin: 0,
	 font_weigth: "bold",
	 font_family: "arial",
	 font_size: 5+baseSize/2
	},
	
	/*
	".test10":{
		display:baseSize==10?"block":"none"
	},
	".test25":{
		display:baseSize==25?"block":"none"
	},
	".test50":{
		display:baseSize==50?"block":"none"
	},
	".test100":{
		display:baseSize==100?"block":"none"
	},*/
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
	 font_size: 5+baseSize*1.1,
	 padding_right: 4
	},
	table: {
	 margin: 5,
	 border_width:1,
	 border_style:"solid",
	 border_color:"black",
	 border_collapse:"collapse",
//	 margin_left:"auto", 
//   margin_right:"auto"
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
	 height: 1*baseSize,//75 (was 2x baseSize?
	 color: 0x5F9EA0,
	 //font: debug?"200 10px monospace":"bold 20px arial",
	 font_size:debug?10:baseSize*0.8,
	 overflow:"auto",
	 margin_top: 5,
//	 margin_left: "auto",
//   margin_right: "auto"
	},
	"#gameover": {
	 //border:"1px solid black",
	 position: "fixed",
	 top: baseSize*4,//125 was *5
	 left: baseSize*3,//0 was *4
	 //right: 0,
	 // margin: "0 auto",
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
		margin: baseSize/4,
		font_size:baseSize,
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
	label: {
		width: 170,
		display: "inline-block",
		font_size: 7+baseSize/2 
	},
	select: {
		font_size: 5+baseSize/2,
		width: baseSize*4
	},
	".centered": {
		width: baseSize * 14
	}
};
res[".test"+baseSize]={
	background_color:0xFFFF00
};
return res;
};

//pour toutes les tailles, calculer les macros, faire le diff, faire la media pour la taille
var sizedMacro=function(baseSize){
	//calculer la css ref, boucler sur les autres, faire une règle par taille + une règle référence.
}
/*
The design is frameworkless. need to adapt to different resolutions:
phone: 480x800? ,  480x290
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
	"@media screen and ( max-width: 400px ) , screen and ( max-height: 400px ) ":css200,
	
	"@media screen and ( min-width: 401px ) and ( max-width: 800px ) , screen and ( min-height: 401px ) and ( max-height: 800px ) ":css400,
	"@media screen and ( min-width: 801px ) , screen and ( min-height: 801px ) ":css800,
	"@media screen and ( min-width: 1601px ) , screen and ( min-height: 1601x ) ":css1600,
	"@media screen and (orientation:landscape)": landscapeMacro(true),
	"@media screen and (orientation:portrait)": landscapeMacro(false)
}

d.extend(css,cssCommun);
console.log(css); 
if (GLOBAL) GLOBAL.css=css;
