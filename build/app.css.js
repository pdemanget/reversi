// source file for css generation
var debug=0;
var baseSize=25;
var lgreen=0x5F5;

var css ={
	"html, body": {
	 width: "100%",
	 height: "100%",
	 margin: 0,
	 font: "bold 20px arial"
	},
	h1:{
	 background: "black",
	 color: 0xFFFFFF,
	 text_align: "center",
	 margin: 0
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
		border_radius: "22px",
		background_color: "black"
	},
	".player2": {
		width: baseSize+"px",
		height: baseSize+"px",
		border: "2px solid black",
		"border-radius": "22px",
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
		left: 0,
		right: 0,
		bottom: 0
	},
	".btn": {
		text_align:"center",
		background_color: lgreen,
		border: "2px solid #050",
		border_radius:7,
		margin: 5,
		font: "bold 25px arial",
		text_transform: "uppercase"
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
} 