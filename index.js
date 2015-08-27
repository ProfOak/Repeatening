var buttons = require('sdk/ui/button/action')
var tabs = require('sdk/tabs')
var prefs = require('sdk/simple-prefs')
var regex = require('sdk/util/match-pattern')

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

function changeWebsite(url) {
    // This opens in current window, instead of a new tab
    tabs.activeTab.attach({
        contentScript: 'window.location="' + url + '"'
    });
}

function changeUrl() {
    // listenonrepeat or youtuberepeater
    var repeating_website = prefs.prefs["website"];
    var valid_yt_video = /.*youtube.com\/.*v=.*/g

    var current_url = tabs.activeTab.url;
    var new_url;
    

    /*
     * TODO:
     * Strip all useless GET req info from url
     */

    // Make sure it's a valid YouTube video
    if (valid_yt_video.exec(current_url) != null) {
        new_url = current_url.replace("youtube.com", repeating_website);
    } else {
        // not a valid youtube video, just go to repeating site
        changeWebsite("https://" + repeating_website);
        return;
    }

    changeWebsite(new_url);

    // Auto pin the tab
    // For some crazy reason simple-prefs type bool does not work
    // So I have to use boolint
    if (prefs.prefs["autopin"] == 1) {
        tabs.activeTab.pin();
    }

}
