/**
 * DeFacto library
 */
(function(frame){
    // check for XMLHttpRequest
    const XMLHttpRequest = window.XMLHttpRequest;
    if(!XMLHttpRequest)
        return false;
    
    const endpoints = {
        baseUrl : "http://localhost:3000/api",
        articles : "http://localhost:3000/api/articles"
    }
    /**
     * DeFacto js API for interacting with DeFacto REST api
     */
    class DeFacto{
        constructor(...args){
        }
        /**
         * 
         * @param {*} comment 
         */
        addComment(commentText, text){

        }
        /**
         * 
         * @param {Object} obj 
         */
        static getArticles(obj){

        }
        /**
         * Checks if an article exists using its url
         * returns new Defacto instance if found, null if not
         */
        static findArticleByUrl(url, callback){
            var request = new XMLHttpRequest;
            
            var requestUrl = endpoints.articles + url;
            request.addEventListener("load", reqListener);
            request.open('GET', encodeURIComponent(requestUrl), true);
            request.send();
            // if not found - return null
            if(request.status === 404){
                return null;
            }
            // if found - return new Defacto instance
            else{
                article = new Defacto();
                return article;
            }
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
    frame.DeFacto = DeFacto;
})(window);