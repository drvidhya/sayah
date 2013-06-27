(function() {
	app.allCanvasToFS('.xray');

	app.setImage('teeth', '../../img/teeth3.png');
	document.getElementById("teeth").addEventListener('click', function(e) {
		e.preventDefault();
	}, true);

	var helpCount = 1,
		teeth = $('#teeth'),
		position = teeth.position();
	app.help(helpCount++);
	$('#xrayplace').css({
		'top': teeth.height() * 0.226 + position.left,
		'left': teeth.width() * 0.328 + position.top,
		'height': teeth.height() * 0.3,
		'width': teeth.width() * 0.05
	}).on('click', function() {
		$('#xrayplace').hide();
		app.help(helpCount++);
		$(".xray-button").on('click', function() {
			app.help(helpCount++);
			$(".xray-button").hide();
			$('#xrayscan').toggleClass('done');
			window.setTimeout(function() {
				$('#xraypic').addClass('done').on('click', function() {
					$('#xraypic').hide();
					app.activityDone();
				})
			}, 2000);
		});
	});
}());