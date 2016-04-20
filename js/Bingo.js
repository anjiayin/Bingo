'use strict';
var usedNum = [];
var choosedNum = [];
var choosedArrary = [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var winArrary1 = [1,1,1,1,1];
var going = true;

window.onload = InitAll;

function InitAll(){
	if(document.getElementById("reload")){
		document.getElementById("reload").onclick = Reload;
	 }

	if(document.getElementById("click")){
		document.getElementById("click").onclick = ChooseNum;
	}
	Reload();
}

function Reload() {
	var CurrNum;
	usedNum = [];
	for (var i = 0; i < 24; i++) {
		do {
			CurrNum = Math.floor((Math.random() + ((i<12?i:i+1)%5))*15)+1;
			var used = false;
			for (var j in usedNum) {
				if (CurrNum === usedNum[j]) used = true;
			}
			if (!used) {
				usedNum.push(CurrNum);
				document.getElementById("Card" + i).innerHTML = CurrNum;
				document.getElementById("Card" + i).onmousedown = ClickData;
			}
		} while (used);
	}
	choosedNum = [];
	document.getElementById("choose").innerHTML = "";
	for(var i = 0; i < 24; i++){
		document.getElementById("Card" + i).className = "";
	}
	document.getElementById("Free").className = "";
	choosedArrary = [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	going = true;
	return false;
}

function ChooseNum(){
	if(!going){
		alert("Reload a new game, Please!");
		return false;
	}
	if(choosedNum.length >= 75){
		alert("You used all chances!");
		return true;
	}
	do{
		var nochoosed = true;
		var res = Math.floor(Math.random()*75) + 1;
		for(var i in choosedNum){
			if(choosedNum[i] === res){
				nochoosed = false;
				break;
			} 
		}
		if(nochoosed){
			choosedNum.push(res);
			document.getElementById("choose").innerHTML = res;
//			console.log("choosedNum[" + (choosedNum.length-1) + "]:" + choosedNum[choosedNum.length-1]);
		}
	}while(!nochoosed);
	return res;
}

function ClickData(){
	if(!going){
		alert("Reload a new game, Please!");
		return false;
	}
	if(this.id != "Free"){
		var sn = (parseInt(this.id.substring(4))< 12)? parseInt(this.id.substring(4)):(parseInt(this.id.substring(4))+1);
		var i = parseInt(sn/5);
		var j = sn%5;
		
		if(this.className == "choosed"){
			this.className = "";
			choosedArrary[i][j] = 0;
		} 
		else{
			if(this.innerHTML == document.getElementById("choose").innerHTML){
				this.className = "choosed";
				choosedArrary[i][j] = 1;
			}	
		}
		if(this.className === "choosed") Winner(i,j);
	}
	return true;
}

function Winner(i,j){
	var count = 0;
	for(var tmp = 0 ; tmp < 5; tmp++){
		if(choosedArrary[tmp][j]) count += Math.pow(2,tmp);
	}
	if(count === (Math.pow(2,5) -1)){
		ChangWinnerColor(-1,j);
		going = false;
		return true;
	}
	count = 0;
	for(tmp = 0 ; tmp < 5; tmp++){
		if(choosedArrary[i][tmp]) count += Math.pow(2,tmp);
	}
	if(count === (Math.pow(2,5) -1)){
		ChangWinnerColor(i,-1);
		going = false;
		return true;
	}
	if( i == j){
		count = 0;
		for(tmp = 0 ; tmp < 5; tmp++){
			if(choosedArrary[tmp][tmp]) count += Math.pow(2,tmp);
		}
	}
	if(count === (Math.pow(2,5) -1)){
		ChangWinnerColor(2,2);
		going = false;
		return true;
	}
	if( (i + j) == 4){
		count = 0;
		for(tmp = 0 ; tmp < 5; tmp++){
			if(choosedArrary[tmp][4 - tmp]) count += Math.pow(2,tmp);
		}
	}
	if(count === (Math.pow(2,5) -1)){
		ChangWinnerColor(-2,-2);
		going = false;
		return true;
	} 
	return false;
}

function ChangWinnerColor(i,j){
	if(i == -1){
		for(var line=0; line < 5; line++){
//			document.getElementById("Card" + ((j*5 + col)>=13 ? j*5 + col -1 : j*5 + col)).className = "Winner";
			document.getElementById(((line*5 + j) == 12 ? "Free" : "Card" + ((line*5 + j)>12? (line*5+j-1):(line*5+j)))).className = "Winner";
		}
	}
	else if(i == 2 && j == 2){
		for(var col=0; col < 5; col++){
			document.getElementById(col*6 == 12 ? "Free": "Card" + ((col*6)>12 ? col*6 - 1 : col*6)).className = "Winner";
		}
	}
	else if( i == -2 && j == -2){
		for(var col=0; col < 5; col++){
			document.getElementById(((4-col)*5 + col) == 12 ? "Free" : "Card" + (((4-col)*5 + col)>12 ? ((4-col)*5 + col - 1) : ((4-col)*5 + col))).className = "Winner";
		}	
	}
	else if(j == -1){
		for(var col=0; col < 5; col++){
			document.getElementById((i*5 + col) == 12 ? "Free" : "Card" + ((i*5 + col)>=13 ? i*5 + col -1 : i*5 + col)).className = "Winner";
		}
	}
	else{
		alert("i=" + i +", j=" + j);
		return false;
	}
	return true;
}
