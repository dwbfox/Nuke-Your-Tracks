// Show welcome screen on first run
if (localStorage.getItem('first_run') == null) {
    chrome.tabs.create({
        url: 'welcome.html'
    });
}


// Nuke Your Tracks button click
chrome.browserAction.onClicked.addListener(function () {
    chrome.browserAction.setBadgeText({
        "text":"!",
    })
    cleanData(function(){
        chrome.browserAction.setBadgeText({"text" : ""});
        notify("Nuke Your Tracks", "Cleanup completed successfully!");
    });
});

function cleanData(callback) {
    var dataObject = {};
    var deleteItems = Object.keys(localStorage);
    var deleteDescription = "";
    // Iterage through each selected setting and clean up accordingly
    for (var i = 0; i < deleteItems.length; i++) {
        if (deleteItems[i] === "showNotifications" || deleteItems[i] === "first_run" || localStorage.getItem(deleteItems[i]) === "false") {
            continue;
        }
        dataObject[deleteItems[i]] = true;
        deleteDescription += deleteItems[i] + "  ";
        console.log("Deleting", deleteItems[i]);
    }
    chrome.browsingData.remove({
        "since": 0
    }, dataObject, function () {
       callback();
    });
}

function notify(t, m) {
    var notifyBox = webkitNotifications.createNotification('/icon48.png', t, m);
    notifyBox.show();
    setTimeout(function () {
        notifyBox.cancel();
    }, 2000);
}