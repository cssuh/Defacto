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
        articles : this.baseUrl + "/articles/",
        articlesByUrl : this.baseUrl + "/articles/url/"
    }

    let API_Key = "";
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
        addComment(commentText, author){
            this.comments.push({author : commentText, comment : commentText })
        }
        /**
         * Updates the article
         * @param {*} params 
         */
        update(params){
            
        }
        /**
         * Saves the information back into the database
         */
        save(){

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
        /**
         * TODO:
         * Sets the API key used to interact with DeFacto API
         */
        static setAPIKey(key){

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