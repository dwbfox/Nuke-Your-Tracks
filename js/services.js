nuke.factory('$chromeStorageService', function() {

	var storage = {};

	storage.set = function(data, callback) {
  	  chrome.storage.sync.set($scope.settings, callback);
	}

	storage.get = function(callback) {}

});
nuke.factory('$growlService', function() {
	var growl = {};

	growl.config = {
		mtype: 'notice',
		delay: 2500,
		title: "Nuke Your Tracks"
	};

	growl.growl = function(m) {
		$.growl[growl.config.mtype]({
			title: growl.config.title,
			message: m
		});


	}
	growl.clear = function() {
		$('.growl').remove();
	}

	return growl;
});