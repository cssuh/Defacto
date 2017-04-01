/**
 * DeFacto library
 */
(function(frame){
    // check for XMLHttpRequest
    const XMLHttpRequest = window.XMLHttpRequest;
    if(!XMLHttpRequest)
        return false;

    /**
     * DeFacto js API for interacting with DeFacto REST api
     */
    class DeFacto{
        constructor(...args){
            this.baseUrl = "http://localhost:3000/api";
        }
        /**
         * 
         * @param {*} comment 
         */
        addComment(commentText, text){

        }
        /**
         * Checks if an article exists using its url
         * returns new Defacto instance if found, null if not
         */
        static findArticleByUrl(url, callback){

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
    }
    frame.DeFacto = DeFacto;
})(window);