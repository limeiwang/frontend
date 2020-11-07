var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var MIME = {
    ".html": "text/html;charset=utf-8",
    ".css": "text/css"
}

var server = http.createServer(function(request, response) {
    if (request.url == '/favicon.ico') {
        return;
    }

    var ext = path.extname(request.url);

    if (ext) {
        response.writeHead(200, {
            'Content-Type': MIME[ext] || "text/plain;charset=utf-8"
        });
    }

    var pathhtml = "";
    if (request.url === "/") {
        pathhtml = path.resolve('index.html');
    } else if (request.url === "/a.html") {
        pathhtml = path.resolve('w', 'a.html');
    } else {
        pathhtml = path.resolve('css', 'style.css');
    }
    response.write(fs.readFileSync(pathhtml));
    response.end();
});
server.listen(2020, function() {
    console.log("listen this port 2020");
});