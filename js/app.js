var DEBUG = true;
var nuke = angular.module('nukeyourtracks', []);


// Routers
nuke.config(function($routeProvider) {
	$routeProvider.when('/settings',
		{
			templateUrl: '../partials/settings.html',
			controller: 'BrowserDataCtrl'
		}
	)
	.when('/changelog',
		{
			templateUrl: '../partials/changelog.html',
			title: 'Changelog'
		}
	)
	.when('/about',
		{
			templateUrl: '../partials/about.html',
			controller: 'AboutCtrl'
		}

	)
	.when('/donate',
	{
		templateUrl: '../partials/donate.html'
	})
	.otherwise(
		{
			redirectTo: '/settings'
		}
	)
});



console.log('App loaded');
