/**
 * DeFacto library
 */
(function(frame){
    // check for XMLHttpRequest
    const XMLHttpRequest = window.XMLHttpRequest;

    let cached = [];

    if(!XMLHttpRequest)
        return false;
    
    
    
    const endpoints = {
        baseUrl : "http://localhost:3000/api",
        articles : "http://localhost:3000/api/articles/",
        articlesByUrl : "http://localhost:3000/api/articles/url/"
    }
    /**
     * DeFacto js API for interacting with DeFacto REST api
     */
    class DeFacto{
        constructor(article, ...args){
            Object.assign(this, article);
        }
        /**
         * 
         * @param {*} comment 
         */
        addComment(commentText, text){

        }
        /**
         * Updates the article
         * @param {*} params 
         */
        update(params){

        }
        /**
         * Gets all articles
         * @param {Object} obj 
         */
        static getArticles(obj, callback){
            var req = new XMLHttpRequest(),
                reqUrl = endpoints.articles;
            req.addEventListener("load", function(){
                // expects an array
                var result = [];
                if(this.response){
                    result = this.response.map(function(article){
                        return new DeFacto(article);
                    });
                }
                if (typeof callback == "function")
                    callback(result);

            });
            req.responseType = "json"; // expect JSON as response
            req.open('GET', reqUrl, true);
            req.send();
        }
        /**
         * Checks if an article exists using its url
         * returns new Defacto instance if found, null if not
         */
        static findArticleByUrl(url, callback){
            var req = new XMLHttpRequest(),
                reqUrl = endpoints.articlesByUrl + encodeURIComponent(extractDomain(url));
            req.addEventListener("load", function(){
                // expects a single result
                var result = null;
                if(this.response){
                    result = new DeFacto(result);
                }
                if (typeof callback == "function")
                    callback(result);
            });
            req.responseType = "json"; // expect JSON as response
            req.open('GET', reqUrl, true);
            req.send();
        }
        /**
         * Makes a post request to add an article to the database
         * [don't go crazy with this]
         * Calls callback with new DeFacto instance
         */
        static addArticle(obj, callback){

        }
        /**
         * Adds a site to the database
         * @param {Object} obj
         * @param {Function} callback 
         */
        static addSite(obj, callback){
            let url = p.url;
            //let siteurl = url.match();
        }

        static get endpoints(){
            return endpoints;
        }
    }
    /**
     * extracts domain from a url
     * @param {*} url 
     */
    function extractDomain(url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        return domain;
    }
    frame.DeFacto = DeFacto;
})(window);