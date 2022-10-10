const AUTOSAVE = 1*1000;

$(document).ready(function() {
	let gameState = {
		clicks: 0
	};
	const clickCounter 		= $("#click-counter");
	const clickBtn 			= $("#main-btn");

	function save() {
		localStorage.setItem("saveData", JSON.stringify(gameState));
	}
	function load() {
		gameState = JSON.parse(localStorage.getItem("saveData"));
	}
	function update() {
		clickCounter.text("You clicked " + gameState.clicks + " times.");
	}
	function init() {
		if(!localStorage.getItem("saveData")) save();
		load();
		update();
	}

	clickBtn.click(function() {
		gameState.clicks++;
		update();
	});

	setInterval(function() {
		save();
	}, AUTOSAVE);

	init();
});