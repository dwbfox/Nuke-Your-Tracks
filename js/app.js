var nuke = angular.module('nukeyourtracks', ['nuke.settings.settingUIButtons']);


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
