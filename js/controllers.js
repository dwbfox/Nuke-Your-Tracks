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
	console.log('BrowserDataCtrl loaded');

	// Load the previous settings
	chrome.storage.sync.get('appSettings', function(data) {
		console.log('Loaded storage data:', data);
		$scope.settings = data;	
		console.log('appSettings: ',$scope.settings);
	});
	
	chrome.storage.sync.get('cleanSettings', function(data) {
		$scope.settings.cleanSettings = data.cleanSettings;	
		console.log('cleanSettings', data.cleanSettings);
	});

	console.log('Loaded settings:', $scope.settings);



	// User sets a setting
	$scope.updateSetting = function(setting) {
		$growlService.config.delay = 450;
		$growlService.growl('Clean ' + setting.name + ': ' + setting.checked);

		// Saved the modified settings
		chrome.stroage.sync.set($scope.settings);
		console.log('updateSetting(): Saving setting...', setting);
	}

}]);

// About page
nuke.controller('AboutCtrl',['$scope','$growlService', '$window', function($scope, $growlService, $window) {
	$growlService.growl('AboutCtrl loaded...')
	$scope.title = 'About';
}]);


console.log('controllers loaded');
