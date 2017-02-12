var totalWins = 0;
var totalPlayed = 0;
var keptWins = 0;
var keptTotal = 0;
var tradedTotal = 0;
var tradedWins = 0;
var totalPer = 0.0;
var keptPer = 0.0;
var tradedPer = 0.0;



function runSimulation(){
	var userDoorString = document.getElementById("doorNum").value;
	var switchBtn = document.getElementById("switchBtn");
	var doorOneCanvas = document.getElementById("FirstDoorCanvas");
	var doorTwoCanvas = document.getElementById("SecondDoorCanvas");
	var doorThreeCanvas = document.getElementById("ThirdDoorCanvas");
	var doorOneCtx = doorOneCanvas.getContext("2d");
	var doorTwoCtx = doorTwoCanvas.getContext("2d");
	var doorThreeCtx = doorThreeCanvas.getContext("2d");


	doorOneCtx.clearRect(0, 0, doorOneCanvas.width, doorOneCanvas.height);
	doorTwoCtx.clearRect(0, 0, doorOneCanvas.width, doorOneCanvas.height);
	doorThreeCtx.clearRect(0, 0, doorOneCanvas.width, doorOneCanvas.height);
	document.getElementById("FirstDoorCanvas").style.background = 'blue';
	document.getElementById("SecondDoorCanvas").style.background = 'blue';
	document.getElementById("ThirdDoorCanvas").style.background = 'blue';	

	var correctDoor = null;
	var badDoor = null;
	var userDoor = parseInt(userDoorString);
	var doorNotUsed = null;
	var originalChosenDoor = userDoor;
	var status = null;
	correctDoor = Math.floor((Math.random() * 3) + 1);

	alert("You have selected door number " + userDoor);
	if(userDoor == 1){
		doorOneCtx.beginPath();
		doorOneCtx.arc(50,100,10,0,2*Math.PI);
		doorOneCtx.stroke();
	} else if(userDoor == 2){
		doorTwoCtx.beginPath();
		doorTwoCtx.arc(50,100,10,0,2*Math.PI);
		doorTwoCtx.stroke();
	} else{
		doorThreeCtx.beginPath();
		doorThreeCtx.arc(50,100,10,0,2*Math.PI);
		doorThreeCtx.stroke();
	}

	function waitForInput(){
		switchBtn.onclick = function(){

			if(userDoor == 1){
				doorOneCtx.clearRect(0, 0, doorOneCanvas.width, doorOneCanvas.height);
			} else if(userDoor == 2){
				doorTwoCtx.clearRect(0, 0, doorOneCanvas.width, doorOneCanvas.height);
			} else{
				doorThreeCtx.clearRect(0, 0, doorOneCanvas.width, doorOneCanvas.height);
			}

			var temp = userDoor;
			userDoor = doorNotUsed;
			doorNotUsed = temp;
			if(userDoor == 1){
				doorOneCtx.beginPath();
				doorOneCtx.arc(50,100,10,0,2*Math.PI);
				doorOneCtx.stroke();
			} else if(userDoor == 2){
				doorTwoCtx.beginPath();
				doorTwoCtx.arc(50,100,10,0,2*Math.PI);
				doorTwoCtx.stroke();
			} else{
				doorThreeCtx.beginPath();
				doorThreeCtx.arc(50,100,10,0,2*Math.PI);
				doorThreeCtx.stroke();
			}
			clearInterval(timer1);
		}
	}

	
	switch(userDoorString){
		case "1":
			//document.getElementById("FirstDoorCanvas").style.background = 'green';
			if(correctDoor != 2){
				badDoor = 2;
				doorNotUsed = 3;
			} else {
				badDoor = 3;
				doorNotUsed = 2;
			}
			break;
		case "2":
			//document.getElementById("SecondDoorCanvas").style.background = 'green';
			if(correctDoor != 1){
				badDoor = 1;
				doorNotUsed = 3;
			} else {
				badDoor = 3;
				doorNotUsed = 1;
			}
			break;
		case "3":
			//document.getElementById("ThirdDoorCanvas").style.background = 'green';
			if(correctDoor != 2){
				badDoor = 2;
				doorNotUsed = 1;
			} else {
				badDoor = 1;
				doorNotUsed = 2;
			}
			break;
		default:
			alert("broken");				
	}
	alert("The prize is not behind door number " + badDoor);
	alert("If you would like to switch to door number " + doorNotUsed + " hit the switch button.");
	switch(badDoor){
		case 1:
			document.getElementById("FirstDoorCanvas").style.background = 'red';
			break;
		case 2:
			document.getElementById("SecondDoorCanvas").style.background = 'red';
			break;
		case 3:
			document.getElementById("ThirdDoorCanvas").style.background = 'red';
			break;
	}
	
	var timer1 = setInterval(waitForInput, 100);
	var timer2 = setTimeout(continueFnc, 5000);
	
	function continueFnc(){
		if(originalChosenDoor == userDoor){
			keptTotal++;
			status = "kept";
		} else {
			tradedTotal++;
			status = "traded";
		}


		if(userDoor == correctDoor){
			totalWins = totalWins + 1;
			if(status == "kept"){
				keptWins++;
			} else{
				tradedWins++;
			}
			alert("You have selected the correct door, door number " + correctDoor + " !!! Great Job :)");
		} else {
			alert("You have selected the wrong door, the correct door was door number " + correctDoor + " ... Try again :(")
		}
		totalPlayed++;

		keptPer = (keptWins * 1.0 / keptTotal) * 100;
		tradedPer = (tradedWins * 1.0 / tradedTotal) * 100;
		totalPer = (totalWins * 1.0 / totalPlayed) * 100;

		document.getElementById("wonKept").innerHTML = keptWins;
		document.getElementById("triedKept").innerHTML = keptTotal;
		document.getElementById("perKept").innerHTML = keptPer;
		document.getElementById("wonTraded").innerHTML = tradedWins;
		document.getElementById("triedTraded").innerHTML = tradedTotal;
		document.getElementById("perTraded").innerHTML = tradedPer;
		document.getElementById("wonTotal").innerHTML = totalWins;
		document.getElementById("triedTotal").innerHTML = totalPlayed;
		document.getElementById("perTotal").innerHTML = totalPer;
	}
}