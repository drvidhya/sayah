var app = (function() {

	var ignoreEvent = function(e) {
		e.stopPropagation();
		e.preventDefault();
		return false;
	}

	return {
		resetImage: function(elName) {
			var el = document.getElementById(elName);
			$(el).show();
			var ctx = el.getContext('2d');
			ctx.globalCompositeOperation = 'source-over';
			ctx.clearRect(0, 0, el.width, el.height);
			return this;
		},

		setImage: function(elName, src) {
			var img = new Image();
			img.src = src;
			img.onload = function() {
				var ctx = document.getElementById(elName).getContext('2d');
				ctx.drawImage(img, 0, 0);
				ctx.globalCompositeOperation = 'destination-out';
			};
			return this;
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
			return this;
		},

		setEvents: function(elName, cb) {
			var el = document.getElementById(elName);
			el.addEventListener('pointerdown', ignoreEvent, true);
			el.addEventListener('pointerup', ignoreEvent, true);
			el.addEventListener('click', ignoreEvent, true);
			el.addEventListener('touchend', ignoreEvent, true);
			el.addEventListener('mouseup', ignoreEvent, true);

			el.addEventListener('pointermove', cb, true);
			return this;

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

		testImage: function(elName, cb) {
			var el = document.getElementById(elName),
				ctx = el.getContext('2d'),
				initial;
			(function loop() {
				window.setTimeout(function() {
					var imgData = ctx.getImageData(0, 0, el.width, el.height);
					var sum = 0;
					for (var i = 0; i < imgData.data.length; i += 4) {
						sum += (imgData.data[i] && 1);
					}
					if (typeof initial === 'undefined') {
						initial = sum;
					}
					//console.log("Checking brushed ", sum, initial, sum / initial, elName);
					if (sum / initial <= 0.10) {
						cb();
					} else {
						loop();
					}
				}, 1000);
			}());
		},

		activityDone: function() {
			var win = document.getElementById("win");
			win && win.play();
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

(function() {
	$.ajaxSetup({
		cache: true
	});

	$(document).on('click', 'a', function(e) {
		var href = $(this).attr('href');
		href && (document.location.hash = href);
		e.preventDefault();
	});

	window.onload = window.onhashchange = function(){
		$('body').load(document.location.hash.substring(1) + "?1", function(resp, status, xhr){
			if (status == "error") {
				alert("Page not found \n " + document.location.hash);
				document.location.hash = 'pages/intro/intro.html';
			}
		});
	}

	//(typeof document.body.webkitRequestFullscreen !== 'undefined') && document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
}());