const AUTOSAVE = 60*1000;
const TICK = 1000/30;

let gameState;

$(document).ready(function() {
	gameState = {
		energy: {
			amount: 0,
			capacity: 100
		},
		accumulator: {
			amount: 0,
			capacity: 10,
			threshold: 5,
			discharge: 0.5,
			updatedTimestamp: 0
		}
	};
	const energyCounter 		= $("#energy-counter");
	const energyProgress 		= $("#energy-progress");
	const accumulatorProgress 	= $("#acc-progress");
	const accumulatorBtn 		= $("#acc-btn");

	function save() {
		localStorage.setItem("saveData", JSON.stringify(gameState));
	}
	function load() {
		gameState = JSON.parse(localStorage.getItem("saveData"));
	}
	function update() {
		energyCounter.text("Energy: " + gameState.energy.amount);
		energyProgress.css("width", "" + 100*gameState.energy.amount/gameState.energy.capacity + "%");
		accumulatorProgress.css("width", "" + 100*gameState.accumulator.amount/gameState.accumulator.capacity + "%");
		
	}
	function init() {
		if(!localStorage.getItem("saveData")) save();
		load();
		update();
	}

	function tick() {
		if((Date.now() - gameState.accumulator.updatedTimestamp)/1000 > gameState.accumulator.threshold) {
			gameState.accumulator.amount = Math.max(0, gameState.accumulator.amount-gameState.accumulator.discharge*TICK/1000);
		}
		update();
	}




	function increaseEnergy(amount=1) {
		if(gameState.accumulator.amount < gameState.accumulator.capacity) {
			gameState.energy.amount = Math.min(gameState.energy.amount+amount, gameState.energy.capacity);
		}
		gameState.accumulator.amount = Math.min(gameState.accumulator.amount+amount, gameState.accumulator.capacity);
		gameState.accumulator.updatedTimestamp = Date.now();
		return gameState.energy.amount;
	}

	accumulatorBtn.click(function() {
		increaseEnergy();
		update();
	});






	setInterval(tick, TICK);
	setInterval(save, AUTOSAVE);
	init();
});