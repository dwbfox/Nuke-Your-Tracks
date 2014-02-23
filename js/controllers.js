// Main app controller
nuke.controller('MainCtrl',['$scope', '$growlService', '$location', function($scope,$growlService,$location) {

	chrome.runtime.onInstalled.addListener(function(e) {
		console.log('On installed!')	
	});

	$scope.version = chrome.runtime.getManifest().version;

	$scope.isActive = function(page) {
		var isPage = (page === $location.$$path)
		return isPage;
	}
}]);

// Main settings page
nuke.controller('BrowserDataCtrl', ['$scope', '$growlService', function($scope, $growlService) {

	// User sets a setting
	$scope.updateSetting = function(setting) {
		var settingVal = $scope.settings.appSettings || $scope.settings.cleanSettings.checked;
		console.log('AppSettings',$scope.settings.appSettings);
		console.log('updateSetting(): Saving setting...', settingVal);
		$growlService.config.delay = 300;

		// Saved the modified settings
		chrome.storage.sync.set($scope.settings, function(e) {
			setTimeout(function() {
				console.log('Setting saved', setting);
				settingChecked = (setting.checked) ? 'ON' : 'OFF';
				$growlService.clear();
				$growlService.growl('Clean <strong>' + setting.name + '</strong> set to: ' + settingChecked);

			}, 300);
		});

	}


	$scope.settings = {};
	console.warn('BrowserDataCtrl invoked');

	$scope.loadSettings = function() {
		console.warn('loadSettings(): $scope: ',$scope);

		// Load the previous application settings
		chrome.storage.sync.get('appSettings', function(data) {
			
			// No data, meaning we haven't initialized it
			if (chrome.runtime.lastError || typeof $scope.settings.appSettings === 'undefined') {
				console.error('loadSettings(): Warning no data found:', $scope.settings, chrome.runtime.lastError);
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
