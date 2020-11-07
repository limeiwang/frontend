var http = require('http');
var path = require('path');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
    });
    var ext = path.extname(req.url);
    console.log(ext)
    if (ext) {
        res.end(fs.readFileSync("./ww/index.html"));
    } else {
        var data = [
            { "name": "zs" },
            { "age": "18" }
        ];
        res.end(JSON.stringify(data));
    }


});

server.listen(8888, function() {
    console.log('----')
});