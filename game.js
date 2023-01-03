const colors = ["green", "red", "yellow", "blue"]

var order = new Array()
var turnIndex

class Round {	
	constructor(){
		turnIndex = 0
		order.push(String(colors[Math.floor(Math.random() * 4)]))
		document.getElementById("inside-circle").innerHTML = String(order.length)
		this.play()
	}
	
	play(){
		colors.forEach(color => document.getElementById(color).addEventListener("click", this.selectColor))
		colors.forEach(color => document.getElementById(color).style.pointerEvents = "none")
		order.forEach((color, index) => { setTimeout (() => this.light(color, index), 1000 * index) })
	}
	
	light(color, index){
		lightAnimation(color, "all 0.4s", "brightness(110%)")
		setTimeout (() => {
			lightAnimation(color, "all 0.4s", "brightness(70%)")
			if(index + 1 == order.length) colors.forEach(color => document.getElementById(color).style.pointerEvents = "auto")
		}, 500)
	}

	selectColor(evt){
		if(turnIndex <= order.length){
			let color = evt.currentTarget.id;
			lightAnimation(color, "all 0.3s", "brightness(110%)")
			setTimeout(() => lightAnimation(color, "all 0.3s", "brightness(70%)"), 200)
		}
		
		if(evt.currentTarget.id != order[turnIndex]) gameOver()
		else if(turnIndex + 1 == order.length) newRound()
		else turnIndex++
	}
}

function lightAnimation(color, transition, filter){
	document.getElementById(color).style.transition = transition
	document.getElementById(color).style.filter = filter
}

function newRound(){
	document.getElementById('start-btn').style.display = "none"
	setTimeout(() => new Round(), 800)
}

function gameOver(){
	swal('Game Over','', 'error').then (()=> { location.reload() })
}