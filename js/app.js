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
	.otherwise({redirectTo: '/about'})
});

var nukeSettings = {

	"appSettings": {
		"firstrun": false,
		"silent": false
	},

	"cleanSettings": [
		{
			name: "App cache",
			checked: true,
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
		
	]
}


// Temp data
var savedSettings = [
		{
			name: "App cache",
			checked: true,
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


console.log('App loaded');
