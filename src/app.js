var app = (function() {

	var ignoreEvent = function(e) {
		e.stopPropagation();
		e.preventDefault();
		return false;
	}

	return {
		setImage: function(elName, src) {
			var img = new Image();
			img.src = src;
			img.onload = function() {
				var ctx = document.getElementById(elName).getContext('2d');
				ctx.drawImage(img, 0, 0);
				ctx.globalCompositeOperation = 'destination-out';
			};
		},

		allCanvasToFS: function(elName) {
			var div = $(elName),
				canvas = div.children('canvas:first');
			if (div.height() / div.width() < 810 / 1280) {
				div.children('canvas').css({
					'height': '100%',
				});
			} else {
				div.children('canvas').css({
					'width': '100%'
				});
			}
			div.children('canvas').css('left', (document.width / 2 - canvas.width() / 2));
		},

		setEvents: function(elName, cb) {
			var el = document.getElementById(elName);
			el.addEventListener('pointerdown', ignoreEvent, true);
			el.addEventListener('pointerup', ignoreEvent, true);
			el.addEventListener('click', ignoreEvent, true);
			el.addEventListener('touchend', ignoreEvent, true);
			el.addEventListener('mouseup', ignoreEvent, true);

			el.addEventListener('pointermove', cb, true);

		},

		eraseImage: function(img) {
			var el = document.getElementById(img),
				$el = $(el),
				ctx = el.getContext('2d'),
				ratio, left;

			return function(e) {
				e.x = e.x || e.clientX;
				e.y = e.y || e.clientY;
				if (!ratio) {
					ratio = {
						x: $el.attr('width') / $el.width(),
						y: $el.attr('height') / $el.height()
					};
				}
				if (!left) {
					left = $el.offset().left;
				}

				ctx.fillStyle = "#f30";
				ctx.beginPath();
				ctx.arc((e.x - left) * ratio.x, e.y * ratio.y, 35, 0, Math.PI * 2, true);
				ctx.fill();
			}
		},

		testImage: function(elName, threshold, cb) {
			var el = document.getElementById(elName);
			var ctx = el.getContext('2d');
			(function loop() {
				window.setTimeout(function() {
					var imgData = ctx.getImageData(0, 0, el.width, el.height);
					var sum = 0;
					for (var i = 0; i < imgData.data.length; i += 4) {
						sum += (imgData.data[i] && 1);
					}
					console.log("Checking brushed ", sum, elName);
					if (sum < threshold) {
						cb();
					} else {
						loop();
					}
				}, 1000);
			}());
		},

		activityDone: function() {
			document.getElementById("win").play();
			$('.confetti').fadeIn();
		},

		help: function(num) {
			if (typeof num === 'undefined') {
				$('#help').hide();
			} else {
				$('#help').show().children('li').hide();
				$('#help>li:nth-child(' + num + ')').show();
			}
		}
	};
}());

document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
