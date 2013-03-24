var ratio;
navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
window.URL = window.URL || window.webkitURL;

function init() {
	ratio = app.allCanvasToFS('.filling');
	drawStep();

}

function drawStep(num) {
	app.setImage('teeth', '/img/teeth2.png');
	app.setImage('decay', '/img/teeth2-decay.png');
	app.setImage('hole', '/img/teeth2-hole.png');
	app.setImage('fill', '/img/teeth2-fill.png');
	app.setImage('light', '/img/teeth2-light.png');

	$('#fill').hide();
	$('#light').hide();
	app.setEvents('decay', app.eraseImage);
	app.testImage('decay', 6000, function() {
		$('#fill').show();
		$('#decay').fadeOut();

		function eraseHole() {
			app.setEvents('hole', app.eraseImage);
			app.testImage('hole', 6000, function() {
				$('#light').show().css('opacity', 0.1);
				$('#pot').hide();
				getLight(500, function(light) {
					if (light === null) {
						$('#hole, #decal, #fill, #light').hide();
						done();
					} else {
						console.log(light / 2000);
						$('#light').css('opacity', light / 2000);
					}
				});
			});
		}

		$('#pot').show().addClass('pulsate').on('touchstart', eraseHole);

	});
}

function done(){
	$('.confetti').show();
}

var localStream;

function getLight(threshold, cb) {
	var video = document.getElementById('monitor');
	var canvas = document.getElementById('lightMonitor');
	var ctx = canvas.getContext('2d');

	function checkLight(stream) {
		var handle = window.setInterval(function() {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			ctx.drawImage(video, 0, 0);

			var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
			var sum = 0;
			for (var i = 0; i < img.data.length; i += 4) {
				if (img.data[i] == 250 && img.data[i + 1] == 255 && img.data[i + 2] === 249) {
					sum++;
				}
			}
			cb(sum, handle);
		}, 100);
		window.setTimeout(function() {
			window.clearInterval(handle);
			stream.stop();
			cb(null);
		}, 10000);
	}

	navigator.getUserMedia({
		video: true
	}, function(stream) {
		if (window.URL) {
			video.src = window.URL.createObjectURL(stream);
			checkLight(stream);
		} else {
			video.src = stream; // Opera.
		}
	}, function() {});
}

init();