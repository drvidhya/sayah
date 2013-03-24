var record = null;
var app = {
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
		var div = $(elName);
		record = div.children('canvas#record');
		console.log(div.width(), div.height(), div.height() < div.width() ? 'height' : 'width');
		var canvas = div.children('canvas:first');
		if (div.height() / div.width() < 810 / 1280) {
			div.children('canvas').css({
				'height': '100%',
			});
		} else {
			div.children('canvas').css({
				'width': '100%'
			});
		}
		var ratio = {
			x: canvas.attr('width') / canvas.width(),
			y: canvas.attr('height') / canvas.height()
		}
		div.children('canvas').css('left', (document.width/2- canvas.width()/2) );
		return ratio;
	},

	setEvents: function(elName, fn) {
		var el = document.getElementById(elName);
		el.addEventListener('touchstart', fn, false);
		el.addEventListener('touchmove', fn, false);
		el.addEventListener('click', function(e) {
			e.preventDefault();
		}, true);
	},

	eraseImage: function(e) {
		var t = e.touches;
		var ctx = this.getContext('2d');
		var rec = record[0].getContext('2d');
		ctx.fillStyle = "#f30";
		for (var i = 0; i < t.length; i++) {
			ctx.beginPath();
			ctx.arc((t[i].clientX - parseInt(this.style.left,10)) * ratio.x, t[i].clientY * ratio.y, 35, 0, Math.PI * 2, true);
			ctx.fill();

			rec.beginPath();
			rec.fillStyle = "rgba(165,0,255,0.3)";
			rec.arc((t[i].clientX - parseInt(this.style.left,10)) * ratio.x, t[i].clientY * ratio.y, 35, 0, Math.PI * 2, true);
			rec.fill();
		}
	},

	saveRecording: function(name){
		window.localStorage.setItem(name, record[0].toDataURL());
	},

	testImage: function(elName, threshold, cb) {
		(function loop() {
			window.setTimeout(function() {
				var el = document.getElementById(elName);
				var ctx = el.getContext('2d');
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
	}

};

$('.confetti div').on('click', function(){
	window.location = '/index.html#list';
});