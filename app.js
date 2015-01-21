/**
====================================================
					REVERSI
					by p.demanget
created: 2015-01-15

====================================================
*/

//TODO persist bug + lost bug
var app={
	params:{
		player1:localStorage.player1|| 'Human', 
		player2:localStorage.player2|| 'Computer'
	},
	game:{
		started:false,
		over: false
	},
	scores:{
		Human:{
			win:localStorage.scoresWinHuman|| 0,
			lost:localStorage.scoresLostHuman||0
		},
		Computer:{
			win:localStorage.scoresWinComputer||0,
			lost:localStorage.scoresLostComputer||0
		}
	}
	
};


var debug=0;
var gplayer=1;
var oth;
var gameover=false;
var score=new Array(3);
//deprecated var computer=true;
var round=0;
var lang= "en";
var i18n={
	en:{
		playerNames:['','Black','White']
	}
}


//==technical
//generation html
function doTable(){
var i,j;
for(i=0;i<8;i++){
document.write('<tr>');
	for(j=0;j<8;j++){
	//document.write('<td><img src="othello/empty.png" onclick="doCell(this,'+i+','+j+')"/></td>');
	document.write('<td onclick="doCell(this,'+i+','+j+')"><div id="cell'+i+'_'+j+'" ></div> </td>');
	}
document.write('</tr>');
}
initGame();
}

function doCell(cell,i,j){
	doTestAndPlay(gplayer,i,j);
}

function doTestAndPlay(player,i,j){
	app.game.started=true;
	if(gameover) return;
	//outprintappend("click"+i+j+player+gplayer);
	var nb = doPlay(player,i,j,false);
	if(nb>0){
		setOpponentPlayer();
		outprintappend("Round "+(round++) +". Got "+nb+" changes ", 2);	
		doNextPlayer();
	}
}

function setOpponentPlayer(){
	var opponent = 3-gplayer;
	if( isPlayable(opponent)){
		gplayer=opponent;
	} else {
		if(! isPlayable(gplayer)){
			stopGames();
			return 1;
		}
	}
	
}

function doNextPlayer(){
 	if(gameover) return;
	outprintappend(i18n[lang].playerNames[gplayer]+ " please");
	if(app.params['player'+gplayer]=='Computer'){
		playComputer(gplayer);
	}
}


var delay=0;
function doPlaySwitchUI(player,i,j,time){
	//outprint("play"+player+i+j);
	//delay= delay?delay+speedDelay:(speedDelay);
	delay= delay?delay+speedDelay:(speedDelay);
	setTimeout(function(){
		document.getElementById("cell"+i+"_"+j).className="player"+player;
		delay=0;
		lastPlayDelay=1;
	},time||delay);
}

function outprint(msg){
	outprintappend(msg,0);
}
function outprintappend(msg,level){
	if(level && level>debug) return;
	console.log(msg);
    if(debug) msg += '<br/>' + document.getElementById('message').innerHTML;
	setTimeout(function(){
		document.getElementById('message').innerHTML =msg;
	},delay);
}
//==game API

function initGame(){
oth = new Array(8);
var i,j;
for(i=0;i<8;i++){
	oth[i]=new Array(8);
	for(j=0;j<8;j++){
	oth[i][j]=0;
	}
}
doPlayAdd(1,3,3);
doPlayAdd(1,4,4);
doPlayAdd(2,3,4);
doPlayAdd(2,4,3);
}

function doPlaySwitch(player,i,j,i0,j0,nb){
var k;
for(k=0;k<nb;k++){
	i+=i0;j+=j0;
	doPlayAdd(player,i,j);
}
}
function doPlayAdd(player,i,j,time){
oth[i][j]=player;
doPlaySwitchUI(player,i,j,time);
}

var lastPlayDelay=1;
//TODO reset to 100, 500
var speedDelay=10;
var computerDelay=50;
/*
algorithm 
loop in 8 direction till border, find other color, till ours, if none, return unplayable code ie 0.
*/
function doPlay(player,i,j,simu){
if(oth[i][j]!=0) return 0;
var i0,j0, rslt=0;
for(i0=-1;i0<=1;i0++)
for(j0=-1;j0<=1;j0++)
	rslt+=doPlayDir(player,i,j,i0,j0,simu);
if(simu) return rslt;
if(rslt>0){
 doPlayAdd(player,i,j,lastPlayDelay);
// lastPlayDelay=delay;
}
return rslt;
}


function doPlayDir(player,i1,j1,i0,j0, simu){
var i=i1,j=j1;
if((i0==0)&&(j0==0)) return 0;
var rslt=0;
var opp=3-player;
i+=i0;j+=j0;
while(inLimit(i) && inLimit(j) && (oth[i][j]==opp)){
	i+=i0;j+=j0;rslt++;
}
if(inLimit(i) && inLimit(j)&& oth[i][j]==player){
	if(simu) return rslt;
	doPlaySwitch(player,i1,j1,i0,j0,rslt);
	return rslt;
}
return 0;
}

function isPlayable(player){
	for(i=0;i<8;i++)
	for(j=0;j<8;j++){
		if(doPlay(player,i,j,true)>0) return true;
	}
	return false;
}

function stopGames(){
	score[1]=0;
	score[2]=0;
	for(i=0;i<8;i++)
	for(j=0;j<8;j++){
		score[oth[i][j]]++;
	}
	app.params.name1=app.params.name1||app.params.player1;
	app.params.name2=app.params.name2||app.params.player2;
	//scores[app.params.name1]=score[1];
	//scores[app.params.name2]=score[2];
	if( score[1]>score[2]){
		app.scores[app.params.name1].win++;
		app.scores[app.params.name2].lost++;
	}else{
		app.scores[app.params.name1].lost++;
		app.scores[app.params.name2].win++;	
	}
	localStorage['scoresWin'+app.params.name1] = app.scores[app.params.name1].win;
	localStorage['scoresWin'+app.params.name2] = app.scores[app.params.name2].win;
	localStorage['scoresLost'+app.params.name1] = app.scores[app.params.name1].lost;
	localStorage['scoresLost'+app.params.name2] = app.scores[app.params.name2].lost;
	gameover=true;
	outprint("The game is over. <br/> <b>Black:</b> "+score[1]+"<br/><b>White:</b> "+score[2]);
	var bigmsg='';
	var human=0;
	if( score[1]==score[2]){
		bigmsg="TIE";
	}
	else if (app.params.player1 == 'Human' && app.params.player2 != 'Human'){
		if( score[1]>score[2]) bigmsg="You WIN";
		else bigmsg="You LOSE";
	}
	else if (app.params.player2 == 'Human' && app.params.player1 != 'Human'){
		if( score[2]>score[1]) bigmsg="You WIN";
		else bigmsg="You LOSE";
	} else if( score[1]>score[2]) bigmsg="Black WIN";
	else bigmsg="White WIN"
	
	document.getElementById('gameover').innerHTML=bigmsg;
	setTimeout(function(){
		document.getElementById('gameover').style.display="table-cell";
	},delay);
	
}

function inLimit(i){return((0<=i) &&(i<8));}
//==extension
var myarray=[
[8,0,6,4,4,6,0,8], 
[0,0,4,4,4,4,0,0], 
[6,4,4,4,4,4,4,6], 
[4,4,4,4,4,4,4,4], 
[4,4,4,4,4,4,4,4], 
[6,4,6,4,4,6,4,6], 
[0,0,4,4,4,4,0,0], 
[8,0,6,4,4,6,0,8]
]
function playComputer(gplayer){
	delay=delay+computerDelay;
	lastPlayDelay=delay;
	outprintappend("play computer "+gplayer,2);
	//just play in priority the best notated cells.
	for(k=8;k>=-1;k--)
	for(i=0;i<8;i++)
	for(j=0;j<8;j++){
		if(myarray[i][j]>=k){
			nb = doPlay(gplayer,i,j,true);//simu
			if(nb>0){
				nb = doTestAndPlay(gplayer,i,j,true);
				if(nb>0){
				//bug see why it happens alert('KO');
				}
				return;
			}
		}
	}
	
	setOpponentPlayer();
	doNextPlayer();
}

function restart(){
	if(!app.game.started){
		doNextPlayer();
		return;
	}

	if(gameover || confirm("Current game wil be lost, are you sure?") ){
		window.location.reload();	
	}
}

var window0;

b={
	links: {},
	button: function(value,onclick){
		b.links[value]=onclick;
		return '<input type="button" class="btn" name="'+value+'" value="'+value+'"/>';
	},
	addLink: function(){
		for(link in b.links){
			console.log(link);
			document.getElementsByName(link)[0].addEventListener("click", b.links[link]);
		}
	}
};
function sfield(field, input){
return '<div class="centered"><label>'+field+': </label>'+
		'<select name="'+input+'"> <option>Human</option><option>Computer</option></select></div>';
}

function label(title, value){
return '<div class="centered"><label>'+title+': </label>'+
		'<span>'+value+' </span></div>';
}

function pushForm(o){
	for(var key in o){
		var elts = document.getElementsByName(key);
		for(var i=0;i<elts.length;i++){
			elts[i].value=o[key];
		}
	}
}
function pullForm(o){
	for(var key in o){
		var elts = document.getElementsByName(key);
		for(var i=0;i<elts.length;i++){
			o[key]=elts[i].value;
		}
	}
}
var params={player1:'', player2:''};
function param(){
	div=document.createElement('div');
	div.setAttribute("class","window");
	window0=document.body.appendChild(div);
	//window0.innerHTML='<div style="position:absolute;top:0;bottom:0;left:0;right:0;" ><h1>test</h1></div>';
	var html ='<h1>Options</h1><br>'+sfield('Player 1 (Black)','player1')+'<br>'+
		sfield('Player2 (White)','player2')+'<br>'+
		label('Human',app.scores.Human.win+' win '+app.scores.Human.lost+' lost')+'<br>'+
		label('Computer',app.scores.Computer.win+' win '+' '+app.scores.Computer.lost+' lost')+
		'<div class="btnbar">'+
		b.button("Cancel",cloze)+
		b.button("Ok",function(){cloze(true);})+
		'</div>';
	window0.innerHTML=html;
	b.addLink();
	pushForm(app.params);
}

function cloze(save){
	if(save){
		pullForm(app.params);
		localStorage.player1=app.params.player1;
		localStorage.player2=app.params.player2;
	}
	window0.remove();
}

function pageLoaded(){
	doHash();
	app.addLink();
	outprintappend("press Start");
}

function doHash(){
	if (window.location.hash=="#options"){
		if( ! window0) param();
	}
}
app.addLink= function(){
	b.links.restart=restart;
	b.links.options=param;
	b.addLink();
}


window.onhashchange=doHash;
