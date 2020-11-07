var http = require('http');
var fs = require('fs');
// http.request('http://localhost:8888', function(res) {
//     var arr = [];
//     res.on('data', function(chunk) {
//         arr.push(chunk);
//     });
//     res.on('end', function() {
//         var data = Buffer.concat(arr);
//         fs.writeFileSync('./jq.js', data);
//     })
// }).end();


http.request('http://www.baidu.com', function(res) {
    res.setEncoding('utf-8');
    var str = "";
    res.on('data', function(chunk) {
        str += chunk;
    });
    res.on('end', function() {
        fs.writeFileSync("./bd.html", str);
    })
}).end();