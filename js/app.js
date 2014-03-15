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
			controller: 'ChangelogCtrl'
		}
	)
	.when('/about',
		{
			templateUrl: '../partials/about.html'	
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
