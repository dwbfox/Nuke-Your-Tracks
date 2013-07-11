// This data would be retrieved from IndexedDB
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
// Controllers
function BrowserDataCtrl($scope) {
	$scope.settings = savedSettings;

}

function AboutCtrl($scope) {

}

function MainCtrl($scope, $location) {

	console.log('Main app controller loaded...');
	$scope.isActive = function(page) {
		var isPage = (page === $location.$$path)
		
		return isPage;
	}
}

app = angular.module('nukeyourtracks', []);

// Routers
app.config(function($routeProvider) {
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

console.log('App loaded.');