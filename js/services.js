console.log('services loaded', nuke);

nuke.factory('growlService', function() {
	return {

		config: {
			type: 'info',
			delay: 2500
		},

		grow: function(message) {
				$.grow({
					type: config['type'],
					text: message,
					delay: config['delay']
				});
		}
	};
})