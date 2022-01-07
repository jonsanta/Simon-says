const startButton = document.getElementById('bttn')

const colors = ["green", "red", "yellow", "blue"];
const order = new Array();

var index = 0;

class Round {	
	constructor(){
		document.getElementById("green").addEventListener("click", this.selectColor);
		document.getElementById("red").addEventListener("click", this.selectColor);
		document.getElementById("yellow").addEventListener("click", this.selectColor);
		document.getElementById("blue").addEventListener("click", this.selectColor);
		document.getElementById("inside-circle").innerHTML = String(order.length+1);
		order.push(String(colors[Math.floor(Math.random() * 4)]));
		this.play();
		index = 0;
	}
	
	play(){
		this.disableColorButtons();
		for(let x = 0; x < order.length; x++)
		{
			setTimeout (() => this.light(x), 1000 * x);
		}
	}
	
	light(index){
		document.getElementById(order[index]).style.transition = "all 0.4s";
		document.getElementById(order[index]).style.filter = "brightness(110%)";
		setTimeout (() => this.lightOff(index), 500);
	}
	
	lightOff(index){
		document.getElementById(order[index]).style.transition = "all 0.4s";
		document.getElementById(order[index]).style.filter = "brightness(70%)";
		
		if(index + 1 == order.length) this.enableColorButtons();
	}
	
	
	selectColor(evt){
		if(index <= order.length){
			let color = evt.currentTarget.id;
			document.getElementById(color).style.filter = "brightness(110%)";
			document.getElementById(color).style.filter = "all 0.2s";
		
			setTimeout(function(){
				document.getElementById(color).style.filter = "brightness(70%)";
			}, 200);
		}
		
		if(evt.currentTarget.id != order[index]) gameOver();
		else if(index + 1 == order.length) newRound();
		
		index++
		
	}
	
	enableColorButtons(){
		for(let x = 0; x < colors.length; x++) { 
			document.getElementById(colors[x]).style.pointerEvents = "auto";
		}
	}
	
	disableColorButtons(){
		for(let x = 0; x < colors.length; x++) { 
			document.getElementById(colors[x]).style.pointerEvents = "none";
		}
	}
}

function newRound(){
	startButton.style.display = "none";
	
	setTimeout(function(){
		window.game = new Round();
	}, 800);
}

function gameOver(){
	swal('Game Over','', 'error').then (()=> {
        location.reload();
    })
}


