var DEBUG = true;
var nuke = angular.module('nukeyourtracks', []);
console.log('App loaded');
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
	.otherwise({redirectTo: '/about'})
});


var savedSettings = [
		{
			name: "App cache",
			checked: false,
			slug: "appcache"
		},
		{
			name: "Browser cache",
			checked: true,
			slug: "browsercache"
		},
		{
			name: "Cookies",
			checked: false,
			slug: "cookies"
		},
		{
			name: "Form data",
			checked: false,
			slug: "formdata"
		},
		{
			name: "Passwords",
			checked: true,
			slug: "passwords"
		},
		{
			name: "IndexedDB",
			checked: true,
			slug: "indexeddb"
		},
		{
			name: "localStorage",
			checked: true,
			slug: "localstorage"
		},
		{
			name: "Plugin Data",
			checked: true,
			slug: "plugindata"
		},
		{
			name: "Server-bound certificates",
			checked: true,
			slug: "serverboundcertificates"
		},
		{
			name: "WebSQL",
			checked: true,
			slug: "websql"
		}
		
	];
