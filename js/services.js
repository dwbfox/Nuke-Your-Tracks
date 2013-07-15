console.log('services loaded', nuke);

nuke.factory('$growlService', function() {
	var growl = {]

	growl.config: {
		type: 'info',
		delay: 2500
	},

	growl.growl = function(message) {
				$.growl({
					type: this.config['type'],
					text: message,
					delay: this.config['delay']
				});
		}
	};

	return growl;
});

nuke.factory('$storageService', function() {

	var storage;
	var cStorage = chrome.storage;

	storage

	storage.syncRemove = function(key) {
		cStorage.remove(key, function(e) {
			console.log('The following key was removed from storage: ', key)
		})
	}

	storage.syncGet = function(key) {
		return cStorage.get(key).key;
	}

	storage.syncSet = function(key,val) {

		// Save it
		cStorage.sync.set({
			key: val
		}, function(e) {
			console.log('The following key,value pair was added to storage: ',val);
		});
	}

});