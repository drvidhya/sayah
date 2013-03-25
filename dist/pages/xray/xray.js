function init() {
	ratio = app.allCanvasToFS('.xray');
	var handle = false;
	app.setImage('teeth', '../../img/teeth3.png');

	document.getElementById("teeth").addEventListener('click', function(e) {
		e.preventDefault();
	}, true);

	$(".xray-button").on('click', function() {
		$('#xrayscan').toggleClass('done');
		window.setTimeout(function() {
			$('#xraypic').addClass('done').on('click', function(){
				$('#xraypic').hide();
				done();
			})
		}, 2000);
	});

	function done(){
		$('.confetti').show();
	}
}

init();