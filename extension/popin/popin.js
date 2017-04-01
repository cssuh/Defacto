
// import DeFacto.js 
(function(){
    if(!DeFacto){
        console.warn("DeFacto.js library missing or not injected");
        return;
    }

    var popin = false;
    var artifact;
    /**
     * listens for the context menu
     */
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if(!popin){
                injectPopin();
            }
            if(request.text){
                // injectPopin();
                // createAnnotationWindow();
                // open up a box to analyze the page as well
            }
        }
    );

    function injectPopin(){
        var pop = document.createElement('div');
        pop.classList.add('defacto-popin');
        pop.innerHTML = "<div class='defacto-loading-spinner hidden'>"+ 
                            "<img src='" + chrome.extension.getURL("images/circle-loading-gif.gif") + "' class='defacto-spinner-img'>"+
                        "</div>"+
                        "<div class='defacto-menu'>"+
                            "<button class='defacto-menu-item summary'>"+
                                "<div class='defacto-menu-item-title'>"+
                                    "Summary" +
                                "</div>"+
                                "<div class='defacto-menu-item-dropdown'>"+
                                "</div>"+
                            "</button>"+
                            "<button class='defacto-menu-item article-information'>"+
                                "<div class='defacto-menu-item-title'>"+
                                    "About this article" +
                                "</div>"+
                                "<div class='defacto-menu-item-dropdown'>"+
                                "</div>"+
                            "</button>"+
                            "<button class='defacto-menu-item site-information'>"+
                                "<div class='defacto-menu-item-title'>"+
                                    "About this site" +
                                "</div>"+
                                "<div class='defacto-menu-item-dropdown'>"+
                                "</div>"+
                            "</button>"+
                        "</div>";
        document.body.appendChild(pop);
        popin = pop;
        loadThisPage();
    }
    /**
     * Searches document for specific text then wraps in span tag (?)
     * @param {*} text 
     * @param {*} x 
     * @param {*} y 
     */
    function injectAnnotator(text, x, y){
        var pop = document.createElement('div');
            pop.innerHTML = "<div>"+
                            "</div>";
    }
    /**
     * Gets all text on a webpage 
     * Returns it as a big ass string
     */
    function webpage2Text(){
        el = document.body;
        var n, 
            a = [], 
            walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        while(n = walk.nextNode()) {
            console.log(n, n.parentNode.tagName);
            if ( ['script','style', 'meta'].includes(n.parentNode.tagName.toLowerCase()) || n.parentElement.style.display === "none") {
                continue;
            }
            a.push(n);
        }

        return a.sort(function(a,b){
                    a.textContent.length < b.textContent.length
                })
                .map(function(a){ 
                    return a.textContent;
                })
                .join("");
    }
    /**
     * Loads the current annotations and such into the page
     */
    function loadThisPage(){
        DeFacto.findArticleByUrl(window.location.href, function(article){
            if(article){
                artifact = article;
            }else{
                artifact = new DeFacto({
                    title : "",
                });
            }
        });
    }
})();