var ratio = {};

function init() {
	ratio = app.allCanvasToFS('.brushing');
	drawStep(1);
	app.testImage('food', 3000, function() {
		$('#food').fadeOut();
		app.saveRecording('Brushing-Food');
		app.testImage('plaque', 3000, function() {
			$('#plaque').fadeOut();
			app.saveRecording('Brushing-Plaque');
			done();
		});
	});
}

function done() {
	document.getElementById("win").play();
	$('.confetti').fadeIn();
}

function drawStep(num) {
	app.setImage('teeth', '/img/teeth' + num + '.png');
	app.setImage('plaque', '/img/teeth' + num + '-plaque.png');
	app.setImage('food', '/img/teeth' + num + '-food.png');
	app.setEvents('food', brush);
	app.setEvents('plaque', brush);
}


var max = $("#teeth").height() / 4;
var ouch = document.getElementById("ouch");

function brush(e) {
	if (e.touches[0].clientY < max && parseInt(Math.random() * 100 % 30) === 2) {
		ouch.play();
	} 
	app.eraseImage.apply(this, arguments);
}

init();