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
	$('.confetti').fadeIn();
}

function drawStep(num) {
	app.setImage('teeth', '/img/teeth' + num + '.png');
	app.setImage('plaque', '/img/teeth' + num + '-plaque.png');
	app.setImage('food', '/img/teeth' + num + '-food.png');
	app.setEvents('food', brush);
	app.setEvents('plaque', brush);
}

var bubble = $('#bubble');

function brush(e) {
	app.eraseImage.apply(this, arguments);
	var t = e.touches;
	var ctx = this.getContext('2d');
	ctx.fillStyle = "#f30";
	bubble.css({
		'top': e.touches[0].clientY - 50,
		'left': e.touches[0].clientX - 60
	});
}

init();