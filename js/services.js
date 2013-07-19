
nuke.factory('$growlService', function() {
	var growl = {};

	growl.config = {
		mtype: 'info',
		delay: 2500
	};

	growl.growl = function(message) {
		$.growl({
			type: this.config.mtype,
			text: message,
			delay: this.config.delay
		});
	}

	return growl;
});


console.log('services loaded', nuke);
