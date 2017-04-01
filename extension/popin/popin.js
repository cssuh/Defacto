var popin_open = false;
var baseUrl = "http://localhost:3000/api/articles/url/";

function injectPopin(){
    var popin = document.createElement('div');
    popin.classList.add('defacto-popin');
    popin.innerHTML = "";
    document.body.appendChild(popin);
}

function reqListener () {
    var response = JSON.parse(this.responseText);
    console.log(response);
} 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(popin_open){

        }
        else{
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("GET", baseUrl + encodeURIComponent( request.url ));
            oReq.send();
        }
    }
);