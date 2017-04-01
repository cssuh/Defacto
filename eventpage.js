/**
 * Javascript file for context menu.
 */

var defactoMenuItem = {
    "id": "defacto",
    "title": "Defacto",
    "contexts": ["all"],
    "onclick": defactoOnClick
}

function defactoOnClick() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {status: "activate"}, function(response) {
                // Activates clicker and creates div
        });
    });
}

chrome.contextMenus.create(defactoMenuItem);

/**
 * Temporary events queue used to track notifications that appear periodically
 */
var eventsQueue = [];

function createEvent(interval){
    var event = function(){

    }
}