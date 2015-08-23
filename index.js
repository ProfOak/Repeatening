var buttons = require('sdk/ui/button/action')
var tabs = require('sdk/tabs')
var prefs = require('sdk/simple-prefs')

var button = buttons.ActionButton({
    id: "repeatening",
    label: "repeatening",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: changeUrl
})

function changeUrl() {
    var current_url = tabs.activeTab.url;

    // listenonrepeat or youtuberepeater
    var repeating_website = prefs.prefs["website"];
    var new_url;

    /*
     * TODO:
     * Strip all useless GET req info from url
     */

    // Make sure it's a valid YouTube video
    if (current_url.indexOf("watch?v") > -1) {
        new_url = current_url.replace("youtube.com", repeating_website);
    } else {
        console.log("Not vaid youtube url" + current_url);
        return;
    }

    // This opens in current window, instead of a new tab
    tabs.activeTab.attach({
        contentScript: 'window.location="' + new_url + '"'
    });

    // Auto pin the tab
    // For some crazy reason simple-prefs type bool does not work
    // So I have to use boolint
    if (prefs.prefs["autopin"] == 1) {
        tabs.activeTab.pin();
    }

}
