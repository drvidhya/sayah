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
		app.resetImage('teeth').setImage('teeth', 'img/teeth' + num + '.png');
		app.resetImage('plaque').setImage('plaque', 'img/teeth' + num + '-plaque.png');
		app.resetImage('food').setImage('food', 'img/teeth' + num + '-food.png');
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

	$(document).on('click', '.play-again', function() {
		window.location.reload();
		return false;
	});

	$(document).on('click', '.info-msg a.big-button', function() {
		playStep($(this).data('next'));
		$('.info-msg').hide();
		$('.confetti').hide();
	});

	app.brushing = function() {
		playStep(stepNum);
	}
}());