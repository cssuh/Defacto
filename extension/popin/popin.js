
// import DeFacto.js 
(function(){
    if(!DeFacto){
        console.warn("DeFacto.js library missing or not injected");
        return;
    }

    var popin = false;
    var artifact;
    var x = null;
    var y = null;

    document.addEventListener('contextmenu', onMouseUpdate, false);
    /**
     * update mouse position on mousedown in order to know where to put box
     * @param {*} e 
     */
    function onMouseUpdate(e) {
        x = e.pageX;
        y = e.pageY;
    }
    /**
     * listens for the context menu
     */
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if(!popin){
                injectPopin();
            }
            loadThisPage();
            wrapSelectedText();
            injectAnnotator(x, y);
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
                                    "Article Summary" +
                                "</div>"+
                                "<div class='defacto-menu-item-dropdown'>"+
                                "</div>"+
                            "</button>"+
                            "<button class='defacto-menu-item article-information'>"+
                                "<div class='defacto-menu-item-title'>"+
                                    "About this Article" +
                                "</div>"+
                                "<div class='defacto-menu-item-dropdown'>"+
                                "</div>"+
                            "</button>"+
                            "<button class='defacto-menu-item related-articles'>"+
                                "<div class='defacto-menu-item-title'>"+
                                    "Related Articles" +
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
    }
    
    let annotator;
    /**
     * Searches document for specific text then wraps in span tag (?)
     * @param {*} text 
     * @param {*} x 
     * @param {*} y 
     */
    function injectAnnotator(x, y){
        // get current mouse position
        if(!annotator){

        }else{
            var pop = document.createElement('div');
                pop.innerHTML = "<div class='defacto-annotator' style='top:"+(x+10)+"px;left:"+(y+10)+"px;position:absolute;'>"+
                                "</div>";
            annotator = pop;
            document.body.appendChild(pop);
        }
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
        return a.join("");
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
            console.log(artifact);
        });
    }

    function wrapSelectedText(){
        var selection= window.getSelection().getRangeAt(0);
        var selectedText = selection.extractContents();
        var span= document.createElement("span");
            span.style.backgroundColor = "yellow";
            span.appendChild(selectedText);
            selection.insertNode(span);
    }

    function generateRatings(num){
        num = Math.max(0, Math.min(num, 5));
        return("x".repeat(num)+"o".repeat(5 - num))
    }
})();