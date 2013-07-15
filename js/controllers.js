console.log('controller');
nuke.controller('MainCtrl',['$scope', '$growlService', '$location', function($scope,$growlService,$location) {
	console.log('$growlService:', $growlService);

	$scope.isActive = function(page) {
		var isPage = (page === $location.$$path)
		return isPage;
	}


}]);


nuke.controller('BrowserDataCtrl', ['$scope', '$growlService', function($scope,$growlService) {

	$growlService.growl('BrowserDataCtrl loaded');
	$('.tooltip').tooltip();
	$scope.settings = savedSettings;
	console.log('BrowserDataCtrl activated..');

	// User sets a setting
	$scope.update = function(setting) {
		console.log('BrowserDataCtrl setting:',setting);
	}
}]);

nuke.controller('AboutCtrl',['$scope','$growlService', '$window', function($scope, $growlService, $window) {
	$growlService.growl('AboutCtrl loaded...')
	$scope.title = 'About';
}]);

