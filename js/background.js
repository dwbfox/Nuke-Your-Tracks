
chrome.browserAction.setTitle({'title': 'Activate Nuke Your Tracks!'});

// First run event. Initalize a new database
chrome.runtime.onInstalled.addListener(function(e) {
	onInstalledCb(e);
});

// Browser button is clicked. Initiate cleaning
chrome.browserAction.onClicked.addListener(function(e) {
	cleanData();
});

function notify(m) {

	var notification = chrome.notifications.create('nuke',{
		iconUrl: 'img/icon128.png',
		title: 'Nuke Your Tracks',
		message: m,
		type: 'basic',
	}, function(e) {
		console.log(e);
	});
	return notification;
}

function cleanData() {
	chrome.browserAction.setBadgeText({text: '!'});

	// 1. Load the app settings from chrome.storage
	chrome.storage.sync.get('cleanSettings', function(data) {
		var i = 0;
		var item;
		var toBeCleaned = {};
		var appSettings;
		var removalOptions;
		var cleanSettings = data.cleanSettings;

		chrome.storage.sync.get('appSettings', function(data) {
			appSettings = data;
		});

		console.log('Browser Action: Retrieved appSettings', appSettings);
		console.log('Browser Action: Retrieved cleanSettings', data.cleanSettings);

		// Iterate through each item that needs to be cleaned
		for (i=0; i<cleanSettings.length; i++) {
			item = cleanSettings[i];

			// Check to see if item is enabled to be cleaned
			if (item.checked) {
				console.log('The following data item will be cleaned:', item);
				toBeCleaned[item.slug] = item.checked;
			}
		}

		// No items are selected
		if (toBeCleaned.length === 0) {
			console.warn('No items selected for cleaning. Aborting operation');
			return;
		}

		console.log('Final list of items to be cleaned:', toBeCleaned.length);

		console.log(toBeCleaned);
		try {
			chrome.browsingData.remove({},toBeCleaned, function(e) {
				notify('Successfully cleaned browser data!', e);
			});

		} catch (e) {
			console.error('An error occured while cleaning:',e,toBeCleaned);
		}
		chrome.browserAction.setBadgeText({text: ''});
	});	
}

function onInstalledCb(e) {

	console.log(e);

	var nukeSettings = {

		"appSettings": {
			"firstrun": false,
			"silent": false
		},

		"cleanSettings": [
			{
				"name": "App cache",
				"checked": false,
				"slug": "appcache",
				"description": "Clears websites' appcache data. May disrupt some web applications that run offline."
			},
			{
				"name": "Browser cache",
				"checked": false,
				"slug": "cache",
				"description": "Clears cached images, stylesheets, and other resources stored on your hard drive"
			},
			{
				"name": "Cookies",
				"checked": false,
				"slug": "cookies",
				"description": "Clears all cookie data (may log you out of signed-in website sessions)"
			},
			{
				"name": "Form data",
				"checked": false,
				"slug": "formData",
				"description": "Clears the browser's stored form data (autofill)."
			},
			{
				"name": "Passwords",
				"checked": false,
				"slug": "passwords",
				"description": "Clears the browser's stored passwords."
			},
			{
				"name": "Downloads",
				"checked": false,
				"slug": "downloads",
				"description": "Clears the browser's list of downloaded files (not the downloaded files themselves)"
			},
			{
				"name": "File Systems",
				"checked": false,
				"slug": "fileSystems",
				"description": "Clears websites' file system data."
			},
			{
				"name": "History",
				"checked": false,
				"slug": "history",
				"description": "Clears the browser's history."
			},
			{
				"name": "IndexedDB",
				"checked": false,
				"slug": "indexedDB",
				"description": "Clears websites' IndexedDB data."
			},
			{
				"name": "localStorage",
				"checked": false,
				"slug": "localStorage",
				"description": "Clears websites' local storage data."
			},
			{
				"name": "Plugin Data",
				"checked": false,
				"slug": "pluginData",
				"description": "Clears plugins' data."
			},
			{
				"name": "Server-bound certificates",
				"checked": false,
				"slug": "serverBoundCertificates"
			},
			{
				"name": "WebSQL",
				"checked": false,
				"slug": "webSQL",
				"description": "Clears websites' WebSQL data."
			}
			
		]
	};

	// Clear out old storage data
	console.log('Removing old data...');
	chrome.storage.sync.clear();

	// Welcome the user
	var nid = notify('Nuke Your Tracks has been updated! Click here for more information');
	chrome.notifications.onClicked.addListener(function(e) {
		chrome.tabs.create({url: "options.html#/changelog"});
	});

	chrome.storage.sync.set(nukeSettings, function(e) {
		console.log('Populated storage with initial data');
	});

	

}
