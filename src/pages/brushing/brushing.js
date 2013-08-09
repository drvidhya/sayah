(function() {

	function done() {
		document.getElementById("win").play();
		$('.confetti').fadeIn();
	}

	function clean(e) {
		if (e.y < max && parseInt(Math.random() * 100 % 30) === 2) {
			ouch.play();
		}

		return app.eraseImage.apply(this, arguments);
	}

	function drawTeeth(num) {
		app.resetImage('teeth').setImage('teeth', '../../img/teeth' + num + '.png?1');
		app.resetImage('plaque').setImage('plaque', '../../img/teeth' + num + '-plaque.png?1');
		app.resetImage('food').setImage('food', '../../img/teeth' + num + '-food.png?1');
	}

	var max = $("#teeth").height() / 4;
	var ouch = document.getElementById("ouch");
	var stepNum = 1;

	function playStep(stepNum) {
		drawTeeth(stepNum);
		$('#food, #plaque').show();
		app.setEvents('food', clean('food')).allCanvasToFS('.brushing').testImage('food', function() {
			app.setEvents('plaque', clean('plaque'));
			//app.saveRecording('Brushing-Food');
			$('#food').fadeOut();
			app.testImage('plaque', function() {
				$('#plaque').hide();
				if (stepNum >= 3) {
					app.activityDone();
				} else {
					$('.info-msg').hide();
					$(".step" + stepNum).show();
				}
			});
		});
	}

	$('.info-msg a.big-button').on('click', function() {
		playStep($(this).data('next'));
		$('.info-msg').hide();
		$('.confetti').hide();
	});

	playStep(stepNum);

}());