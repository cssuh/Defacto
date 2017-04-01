 /**
 * Javascript file for context menu.
 */
function onClick(a){
    var data = {
        url : a.pageUrl,
        text : a.selectionText
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data, function(response) {});
    });
}

chrome.contextMenus.create({
    "id": "defacto_line_check",
    "title": "Defacto - Fact Check",
    "contexts": ["all"],
    "onclick": onClick
});