/**
* The controller for the options page
* 
*/
nuke.controller('MainCtrl',['$scope', '$growlService', '$location', function($scope,$growlService,$location) {

    chrome.runtime.onInstalled.addListener(function(e) {
        console.log('On installed!')    
    });

    $scope.version = chrome.runtime.getManifest().version;
    var d = new Date();
    $scope.year = d.getFullYear();
    $scope.isActive = function(page) {
        var isPage = (page === $location.$$path)
        return isPage;
    }
}]);

/**
 * The controller for the about page
 * 
 */
nuke.controller('ChangelogCtrl', ['$scope', function($scope) {
    $('.accordion').accordion();
    console.log('About controller');
}]);


/**
* The  controller for the settings page.
* See settings.html for the view
*/
nuke.controller('BrowserDataCtrl', ['$scope', '$growlService', function($scope, $growlService) {

    $scope.settings = {};

    /**
    * Triggered when the select all checkbox is clicked
    */
    $scope.selectAllSettings = function($event) {
        console.log($event);
        if ((typeof $event.target.checked !== 'undefined')) {

            for (i=0; i<$scope.settings.cleanSettings.length; i++) {
                $scope.settings.cleanSettings[i].checked = $event.target.checked;
            }

            $scope.saveSettings(function() {
                console.log('selectAllSettings(): Settings saved');
            });
        }
    }


    /**
     * Saves the current settings object into storage
     * @param  {Function} callback
     * @return {void}
     */
    $scope.saveSettings = function(callback) {
        console.log('saveSettings(): Saving settings', $scope.settings);
        chrome.storage.sync.set($scope.settings, callback);

    }

    /**
    * Loads all the settings whenever the options page is opened. 
    * The data is stored under chrome's non standared synced storage
    */
    $scope.loadSettings = function() {
        console.warn('loadSettings(): $scope: ',$scope);

        // Load the previous application settings
        chrome.storage.sync.get('appSettings', function(data) {
            
            // No data, meaning we haven't initialized it
            if (typeof chrome.runtime.lastError  !== 'undefined') {
                console.error('loadSettings(): Warning no data found:', $scope.settings.appSettings, chrome.runtime.lastError);
            }

            $scope.$apply(function() {
                // Now load them
                console.log('Loaded storage data (appSettings):', data);
                $scope.settings.appSettings = data.appSettings; 

            });

        });     

        // Load the cleaning settings
        chrome.storage.sync.get('cleanSettings', function(data) {
            $scope.$apply(function() {
                console.log('Loaded storage data (cleanSettings):', data);
                $scope.settings.cleanSettings = data.cleanSettings; 
            });
        });
    }

    /**
    * Triggered each time a cleanable item is selected
    */
    $scope.updateSetting = function(setting) {
        var settingVal = $scope.settings.appSettings || $scope.settings.cleanSettings.checked;
        $growlService.config.delay = 300;

        // Saved the modified settingsfor tfor
        $scope.saveSettings(function() {
            setTimeout(function() {
                settingChecked = (setting.checked) ? 'ON' : 'OFF';
                $growlService.clear();
                $growlService.growl('Clean <strong>' + setting.name + '</strong> set to: ' + settingChecked);

            }, 300);
        });

    }



}]);