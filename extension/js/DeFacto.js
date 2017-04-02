/**
 * DeFacto library
 */
(function(frame){
    let debugging = true;
    // check for XMLHttpRequest
    const XMLHttpRequest = window.XMLHttpRequest;

    let cached = [];
    let baseUrl = debugging ? "http://localhost:8081/api" : "http://lowcost-env.cb4wunhcrv.us-east-1.elasticbeanstalk.com/api";

    if(!XMLHttpRequest)
        return false;
    
    const endpoints = {
        articles : baseUrl + "/articles/",
        articlesByUrl : baseUrl + "/articles/url/"
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
            this.comments.push({author : author, comment : commentText })
        }
        /**
         * Updates the article
         * @param {*} params 
         */
        update(params){
            
        }
        /**
         * Saves the information back into the database with put. TODO
         */
        save(){

        }
        /**
         * Search for articles
         * @param {*} term 
         * @param {*} calback 
         */
        static searchArticles(term, calback){

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
                reqUrl = endpoints.articlesByUrl + encodeURIComponent(url);
            req.addEventListener("load", function(){
                // expects a single result
                var result = null;
                if(this.response){
                    result = new DeFacto(this.response);
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
            var req = new XMLHttpRequest();
            var reqUrl = endpoints.articles; //+ encodeURIComponent(extractDomain(obj));

            var params = JSON.stringify({
                title : obj.title,
                url : obj.url,
                site_url : extractDomain(obj.url),
                descr : obj.desc,
                search_url : obj.search_url,
                bias : obj.bias,
                isSatire : obj.isSatire,
                rating : obj.rating,
            });
            req.addEventListener('load',function(){
                let resp = JSON.parse(this.response);
                if(resp.article){
                    if(typeof callback == "function")
                        callback(new DeFacto(resp.article));
                }
            })
            req.open('POST', reqUrl, true);
            req.setRequestHeader("Content-type", "application/json");
            req.send(params);
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
        if(!url)
            return "";
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