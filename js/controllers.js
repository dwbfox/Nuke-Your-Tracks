// Main app controller
nuke.controller('MainCtrl',['$scope', '$growlService', '$location', function($scope,$growlService,$location) {

	$scope.isActive = function(page) {
		var isPage = (page === $location.$$path)
		return isPage;
	}
}]);

// Main settings page
nuke.controller('BrowserDataCtrl', ['$scope', '$growlService', function($scope, $growlService) {

	$scope.settings = {};
	console.warn('BrowserDataCtrl invoked');

	$scope.loadSettings = function() {
		console.warn($scope);
		// Load the previous settings
		chrome.storage.sync.get('appSettings', function(data) {
			$scope.$apply(function() {
				console.log('Loaded storage data (appSettings):', data);
				$scope.settings.appSettings = data.appSettings;				
			});

		});		

		chrome.storage.sync.get('cleanSettings', function(data) {
			$scope.$apply(function() {
				console.log('Loaded storage data (cleanSettings):', data);
				$scope.settings.cleanSettings = data.cleanSettings;	
			});
		});

		console.log($scope.settings)
	}

	console.warn('Have not loaded settings:', $scope.settings);
	$scope.loadSettings();
	console.warn('Now loaded settings:', $scope.settings);



	// User sets a setting
	$scope.updateSetting = function(setting) {
		console.log('updateSetting(): Saving setting...', setting);
		$growlService.config.delay = 500;
		$growlService.growl('Clean ' + setting.name + ': <strong>' + setting.checked + '</strong>');

		// Saved the modified settings
		chrome.storage.sync.set($scope.settings);
	}

}]);

// About page
nuke.controller('AboutCtrl',['$scope','$growlService', '$window', function($scope, $growlService, $window) {
	console.log('AboutCtrl loaded...')
	$scope.title = 'About';
}]);


console.log('controllers loaded');
