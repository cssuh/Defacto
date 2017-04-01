// smmry js wrapper
var http = require('http');
var querystring = require('querystring');
var keys = require('./api_keys');

module.exports = function(text, cb){
    if(!text || text.length <= 500){
        cb({message : "text is too short"});
        return false;
    }
    var post_data = querystring.stringify({
        'sm_api_input' : text
    });
    var options = {
        host : 'api.smmry.com',
        path : '/&SM_API_KEY=' + keys.SMMRY + "&SM_KEYWORD_COUNT=10",
        method : 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
        }
    }
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