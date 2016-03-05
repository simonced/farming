$(document).ready(function() {
	// no text selection in the game screen
	$(document).attr('unselectable','on')
		.css({'-moz-user-select':'-moz-none',
			'-moz-user-select':'none',
			'-o-user-select':'none',
			'-khtml-user-select':'none', /* you could also put this in a class */
			'-webkit-user-select':'none',/* and add the CSS class here instead */
			'-ms-user-select':'none',
			'user-select':'none'
		})
		.bind('selectstart', function(){ return false; });
	
	// props events
	$('.farm').on('click', '.prop-activable', function() {
		console.log( "TODO deal with the dock icon and the prop!" );
	});
});
