/* Pre-requisite
==================
1) Create an Environment (if you don't already have on) and enable it for your request
2) Add two variables to your environment:
    * "RecombeeDB" and fill in our DB Name from Recombee as Initial Value
    * "PrivateToken" and fill in our Private Token from Recombee as Initial Value
    * "BaseUrl" and fill in API endpoint (e.g. https://rapi.recombee.com)
3) Add params for your request:
    * "filter" with the value "{{filter}}"
    * "booster" with the value "{{booster}}"
4) Add the following Pre-request Script that computes the two variables and adds them into your environment
5) Your request GET URL should look like this (Example to list all items from Recombee):
    `{{BaseUrl}}/{{RecombeeDB}}/items/list/`

Example URLs:
* Recommend items to item:
    `{{BaseUrl}}/{{RecombeeDB}}/recomms/items/{{ITEM_ID}}/items/`
* Recommend items to item with filter and booster:
    `{{BaseUrl}}/{{RecombeeDB}}/recomms/items/{{ITEM_ID}}/items/?filter={{filter}}&booster={{booster}}`

*/

//If you want to use the filter or boosting attributes, you need to set them here because of escaping logics of recombee and Postman.
//If you don´t want to use them in your request, let them empty.
var filter  = "'active'";
var booster = "if 'itemId' in \"PROD_42266\" then 10 else 1";

function getParams(params) {

    const encodedParams = encodeURIComponent(params)
        .replace(/{/g, "%7B")
        .replace(/}/g, "%7D")
        .replace(/'/g, "%27");

    return encodedParams;
}

function getPath(url) {
    var url_replaced = pm.variables.replaceIn(url)
    var pathRegex = /.+?\:\/\/.+?(\/.+?)(?:#|$)/;
    var result = url_replaced.match(pathRegex);
    return result.length > 1 ? result[1] : '';
}

function getToken(requestUrl, timestamp) {
    var SECRET_KEY = 'MiWnAgFisnr8dRFXyPsBm9cOev5ZvgGUUB9CmpLtOrhQbhMrdJzl9gIMTbezkIw9';

    var requestPath = getPath(requestUrl);

    var querystringregex = /\?/;
    var querystringexist = requestPath.match(querystringregex);
    if(querystringexist != null && querystringexist.length > 0) {
        var separator = "&";
    }
    else {
        var separator = "?";
    }

    var PathWithTimestamp = requestPath + separator + "hmac_timestamp=" + timestamp;
    var SignedPath = CryptoJS.HmacSHA1(PathWithTimestamp, SECRET_KEY)

    return SignedPath;
}

function signUrl() {
    var timestamp = getTimestamp();
    var hmacSign = getToken(pm.request.url.toString(), timestamp);

    postman.setEnvironmentVariable('hmac_timestamp', timestamp);
    postman.setEnvironmentVariable('hmac_sign', hmacSign);
    pm.request.url.query.add("hmac_timestamp={{hmac_timestamp}}")
    pm.request.url.query.add("hmac_sign={{hmac_sign}}")
}

function getTimestamp() {
    var timestamp = Math.floor(Date.now() / 1000);
    return timestamp;
}

if(booster == null || booster == "") {
    pm.request.url.query.remove("booster");
}
if(filter == null || filter == "") {
    pm.request.url.query.remove("filter");
}

postman.setEnvironmentVariable("filter", getParams(filter));
postman.setEnvironmentVariable("booster", getParams(booster));
signUrl();