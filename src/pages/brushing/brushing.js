(function() {

	drawStep(1);

	app.setEvents('food', clean('food'));
	app.allCanvasToFS('.brushing');
	app.testImage('food', 3000, function() {
		app.setEvents('plaque', clean('plaque'));
		//app.saveRecording('Brushing-Food');
		$('#food').fadeOut();
		app.testImage('plaque', 3000, function() {
			$('#plaque').fadeOut();
			app.activityDone();
		});
	});

	function done() {
		document.getElementById("win").play();
		$('.confetti').fadeIn();
	}

	function drawStep(num) {
		app.setImage('teeth', '../../img/teeth' + num + '.png');
		app.setImage('plaque', '../../img/teeth' + num + '-plaque.png');
		app.setImage('food', '../../img/teeth' + num + '-food.png');
	}


	var max = $("#teeth").height() / 4;
	var ouch = document.getElementById("ouch");

	function clean(e) {
		if (e.y < max && parseInt(Math.random() * 100 % 30) === 2) {
			ouch.play();
		}

		return app.eraseImage.apply(this, arguments);
	}
}());