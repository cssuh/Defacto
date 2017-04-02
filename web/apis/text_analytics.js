// js wrapper for microsoft cog service(s)
var http = require('http');
var querystring = require('querystring');
var keys = require('./api_keys');

module.exports = function(text, cb){
    if(!text || text.length <= 500){
        cb({status : 400, message : "text is too short"});
        return false;
    }
    var post_data = JSON.stringify({
        "documents": [{
            language : "english", 
            id : "0",
            text : text.substr(0,16000) // limit to 16000 characters
        }]
    });
    var options = {
        "method": "POST",
        "hostname": "westus.api.cognitive.microsoft.com",
        "path": "/text/analytics/v2.0/sentiment",
        "headers": {
            "ocp-apim-subscription-key": keys.Microsoft_Cognitive_Text_Analytics,
            "content-type": "application/json",
            "cache-control": "no-cache"
        }
    };
    var req = http.request(options, function(response){
        var str = '';
        response.on('data', function(chunk){
            str += chunk;
        });
        response.on('end', function(){
            cb(JSON.parse(str));
        });
    });
    
    req.write(post_data);
    req.end();
    return true;
}