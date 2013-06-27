(function() {
	ratio = app.allCanvasToFS('.xray');
	var handle = false;
	app.setImage('teeth', '../../img/teeth3.png');

	document.getElementById("teeth").addEventListener('click', function(e) {
		e.preventDefault();
	}, true);

	$(".xray-button").on('click', function() {
		$(".xray-button").hide();
		$('#xrayscan').toggleClass('done');
		window.setTimeout(function() {
			$('#xraypic').addClass('done').on('click', function() {
				$('#xraypic').hide();
				app.activityDone();
			})
		}, 2000);
	});
}());