(function() {
	app.allCanvasToFS('.filling');
	app.setImage('teeth', 'img/teeth2.png?1');
	app.setImage('decay', 'img/teeth2-decay.png?1');
	app.setImage('hole', 'img/teeth2-hole.png?1');
	app.setImage('fill', 'img/teeth2-fill.png?1');
	app.setImage('light', 'img/teeth2-light.png?1');

	var helpCount = 1;
	app.help(helpCount++);
	app.setEvents('decay', app.eraseImage('decay'));
	app.testImage('decay', function() {
		app.help(helpCount++);
		$('#fill').show();
		$('#decay').fadeOut();
		$('#pot').show().addClass('pulsate').on('click', function() {
			app.help(helpCount++);
			app.setEvents('hole', app.eraseImage('hole'));
			app.testImage('hole', function() {
				app.help(helpCount++);
				$('#pot').hide();
				$('#light').show().css('opacity', 0.1);
				getLight(500, function(light) {
					if (light === null) {
						$('#hole, #decal, #fill, #light').hide();
						app.help(helpCount);
						app.activityDone();
					} else {
						console.log(light / 2000);
						$('#light').css('opacity', light / 2000);
					}
				});
			});
		});
	});

	/*navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
	window.URL = window.URL || window.webkitURL;
	var checkCamera;
	navigator.getUserMedia({
		video: true
	}, function() {
		if (typeof checkCamera === 'function') {
			cameraTest(stream, checkCamera)
		}
	}, function() {

	});*/

	function cameraTest(stream, cb) {
		video.src = window.URL ? window.URL.createObjectURL(stream) : stream
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
			cb(sum);
		}, 100);
		window.setTimeout(function() {
			window.clearInterval(handle);
			stream.stop();
			cb(null);
		}, 10000);
	}

	function getLight(threshold, cb) {
		var video = document.getElementById('monitor');
		var canvas = document.getElementById('lightMonitor');
		var ctx = canvas.getContext('2d');
		$('#shinelight').show().on('click', function() {
			$('#light').addClass('artificialLight');
			window.setTimeout(function() {
				cb(null);
			}, 1000);
		});
		checkCamera = cb;
	}

}());