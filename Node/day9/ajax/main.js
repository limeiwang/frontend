var http = require('http');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var url = require('url');
var MIME = {
        ".html": "text/html;charset=utf-8",
        ".css": "text/css",
        ".js": "text/js"
    }
    //搭建服务器
var server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    var pathname = url.parse(req.url).pathname;
    var ext = path.extname(pathname);
    if (ext) {
        //对文件的访问
        try {
            res.writeHead(200, {
                'content-type': MIME[ext] || 'text/plain'
            });
            res.end(fs.readFileSync(path.join(__dirname, 'ww', pathname)));
        } catch (e) {
            res.writeHead(404);
            res.end('not found!')
        }

    } else {
        //对接口的访问
        res.writeHead(200, {
            '`Access-Control-Allow-Origin`': '*'
        });
        if (req.method === "GET") { //get
            var data = url.parse(req.url, true).query;
            res.end(JSON.stringify(data));
        } else { //post
            var arr = [];
            req.on('data', function(chunk) {
                arr.push(chunk)
            });
            req.on('end', function() {
                var data = Buffer.concat(arr).toString();
                var obj = querystring.parse(data);
                res.end(JSON.stringify(obj));
            });
        }
    }
});
//监听
server.listen(8080, function() {
    console.log("---");
});
//1 /favicon
//2 /index.html  /style.css  ->  fs
//3 /     ->   json