chrome.browserAction.setTitle({'title': 'Activate Nuke Your Tracks!'});

// Browser button is clicked. Initiate cleaning
chrome.browserAction.onClicked.addListener(function(e) {
	cleanData();
});

function cleanData() {

	// 1. Load the app settings from chrome.storage
	chrome.storage.sync.get('cleanSettings', function(data) {
		var i = 0;
		var item;
		var toBeCleaned = {};
		var removalOptions;
		var cleanSettings = data.cleanSettings;

		console.log('Browser Action: Retrieved cleanSettings', data.cleanSettings);

		// Iterate through each item that needs to be cleaned
		for (i=0;i < cleanSettings.length;i++) {
			item = cleanSettings[i];

			// Check to see if item is enabled to be cleaned
			if (item.checked) {
				console.log('The following data item will be cleaned:', item);
				toBeCleaned[item.name] = item.checked;
			}
		}

		// No items are selected
		if (toBeCleaned.length === 0) {
			console.warn('No items selected for cleaning. Aborting operation');
			return;
		}

		console.log('Final list of items to be cleaned:', toBeCleaned.legnth);

		// 3 Iterate through each item in cleanSettings object and remove the relevant data
		console.log('About to begin the cleaning process!');
		try {
			chrome.browsingData.remove(toBeCleaned, function(e) {
				console.log('Cleaning process finished', e);
			});
		} catch (e) {
			console.error('An error occured while cleaning:',e);

		}
	});	
}

function onInstalledCb(e) {

	// Clear out old storage data
	console.log('Removing old data...');
	chrome.storage.sync.clear();

	// Welcome the user
	chrome.tabs.create({url: "options.html#/about"});

	var nukeSettings = {

		"appSettings": {
			"firstrun": false,
			"silent": false
		},

		"cleanSettings": [
			{
				"name": "App cache",
				"checked": false,
				"slug": "appcache"
			},
			{
				"name": "Browser cache",
				"checked": false,
				"slug": "browsercache"
			},
			{
				"name": "Cookies",
				"checked": false,
				"slug": "cookies"
			},
			{
				"name": "Form data",
				"checked": false,
				"slug": "formData"
			},
			{
				"name": "Passwords",
				"checked": false,
				"slug": "passwords"
			},
			{
				"name": "Downloads",
				"checked": false,
				"slug": "downloads"
			},
			{
				"name": "File Systems",
				"checked": false,
				"slug": "fileSystems"
			},
			{
				"name": "History",
				"checked": false,
				"slug": "history"
			},
			{
				"name": "IndexedDB",
				"checked": false,
				"slug": "indexedDB"
			},
			{
				"name": "localStorage",
				"checked": false,
				"slug": "localStorage"
			},
			{
				"name": "Plugin Data",
				"checked": false,
				"slug": "pluginData"
			},
			{
				"name": "Server-bound certificates",
				"checked": false,
				"slug": "serverBoundCertificates"
			},
			{
				"name": "WebSQL",
				"checked": false,
				"slug": "webSQL"
			}
			
		]
	};

	chrome.storage.sync.set(nukeSettings, function(e) {
		console.log('Populated storage with initial data');
	});

	

}
