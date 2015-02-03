/**
 * Advanced computer mode.
 * minimax algorithm
 * depends on board.doPlay, board.doTestAndPlay
 Todo board.getRound(), board.getBoard(i,j) board.getScore() board.clone()
 *
 * archi
 playComputerModel(board)
 ^ i,j
 note[i,j]=c.scoreCell(board,i,j)
 b2=b.clone();
 b2.playModel(i,j);
 b2.score() || c.scoreBoard(b2)
 
 c.ScoreBoard(board):
 ^ i,j
 note[i,j]=c.scoreCell(board,i,j)
 
 c.scoreCell(board,i,j):
 isLeaf(note en dur)
 else
 b2=b.clone();
 b2.playModel(i,j);
 c.scoreBoard(b2)
 
 
 */
var Computer=function Computer(board, depth){

function inLimit(i){return((0<=i) &&(i<8));}
//==extension
var cellBonus=[
[8,0,6,4,4,6,0,8], 
[0,0,4,4,4,4,0,0], 
[6,4,4,4,4,4,4,6], 
[4,4,4,4,4,4,4,4], 
[4,4,4,4,4,4,4,4], 
[6,4,6,4,4,6,4,6], 
[0,0,4,4,4,4,0,0], 
[8,0,6,4,4,6,0,8]
];
var m=-65;
var cellNote=[
[m,m,m,m,m,m,m,m],
[m,m,m,m,m,m,m,m],
[m,m,m,m,m,m,m,m],
[m,m,m,m,m,m,m,m],
[m,m,m,m,m,m,m,m],
[m,m,m,m,m,m,m,m],
[m,m,m,m,m,m,m,m],
[m,m,m,m,m,m,m,m]
];
maxIndex = function(arr){
	var mx=m;
	var res=null;
	for(i=0;i<8;i++)
	for(j=0;j<8;j++){
		if (arr[i][j]>mx){
			mx=arr[i][j];
			res[0]=i;
			res[1]=j;
		}
	}
	return res;
}
this.playComputerModel = function(gplayer, round){
	/*delay=delay+computerDelay;
	lastPlayDelay=delay;
	outprintappend("play computer "+gplayer,2);*/
	//just play in priority the best notated cells.
	for(k=8;k>=-1;k--)
	for(i=0;i<8;i++)
	for(j=0;j<8;j++){
		if(cellBonus[i][j]>=k){
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
	
	//play the best notated cell given by min max algorithm.
	var indexMax=maxIndex(arr);
	return indexMax;//return result, let board make the ui updates.
	/*
	var nb = doTestAndPlay(gplayer,indexMax[0],indexMax[1]);
	setOpponentPlayer();
	doNextPlayer();
	*/
}

//no indentation for that level: just a class wrapper
return this;
};
var computer4 = new Computer(board,4);