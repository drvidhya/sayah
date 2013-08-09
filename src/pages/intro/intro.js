(function() {
	console.log($('.link-activity-list, .link-intro'));
	$('.link-activity-list, .link-intro').on('click', function() {
		$('.logo').toggle();
		$('.activities').toggle();
	});
}());