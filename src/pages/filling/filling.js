app.filling = function() {
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
				$('#shinelight').show().css('opacity', 1);
			});
		});
	});
};

$(document).on('click', '#shinelight', function() {
	$('#hole, #decal, #fill, #light').hide();
	app.help(5);
	app.activityDone();
});