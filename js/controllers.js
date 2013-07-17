// Main app controller
nuke.controller('MainCtrl',['$scope', '$growlService', '$location', function($scope,$growlService,$location) {

	chrome.runtime.onInstalled.addListener(function(e) {
		console.log('On installed!')	
	});

	$scope.isActive = function(page) {
		var isPage = (page === $location.$$path)
		return isPage;
	}
}]);

// Main settings page
nuke.controller('BrowserDataCtrl', ['$scope', '$growlService', function($scope, $growlService) {

	// User sets a setting
	$scope.updateSetting = function(setting) {
		console.log('updateSetting(): Saving setting...', setting);
		$growlService.config.delay = 500;
		$growlService.growl('Clean ' + setting.name + ': <strong>' + setting.checked + '</strong>');

		// Saved the modified settings
		chrome.storage.sync.set($scope.settings);
	}


	$scope.settings = {};
	console.warn('BrowserDataCtrl invoked');

	// Initalize the storage with empty data if not set already
	$scope.initSettings = function() {
		console.warn('Initalizing a new load of settings');
		console.log('Default settings: ', nukeSettings);
		$scope.updateSetting(nukeSettings);
	}


	$scope.loadSettings = function() {
		console.warn('loadSettings(): $scope: ',$scope);

		// Load the previous application settings
		chrome.storage.sync.get('appSettings', function(data) {
			
			// No data, meaning we haven't initalized it
			if (chrome.runtime.lastError || typeof $scope.settings.appSettings === 'undefined') {
				console.error('loadSettings(): Warning no data found:', $scope.settings, chrome.runtime.lastError);
				$scope.initSettings();			
			}

			$scope.$apply(function() {


				// Now load them
				console.log('Loaded storage data (appSettings):', data);
				$scope.settings.appSettings = data.appSettings;	

			});

		});		

		// Load the cleaning settings
		chrome.storage.sync.get('cleanSettings', function(data) {
			$scope.$apply(function() {
				console.log('Loaded storage data (cleanSettings):', data);
				$scope.settings.cleanSettings = data.cleanSettings;	
						console.log($scope.settings)
			});
		});


	}

	$scope.loadSettings();


}]);

// About page
nuke.controller('AboutCtrl',['$scope','$growlService', '$window', function($scope, $growlService, $window) {
	console.log('AboutCtrl loaded...')
	$scope.title = 'About';
}]);


console.log('controllers loaded');
