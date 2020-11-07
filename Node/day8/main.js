var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var url = require("url");
var MIME = {
    '.js': 'javaScript',
    '.html': 'text/html',
    '.css': 'text/css'
}

//2.搭建服务器
var server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    var ext = path.extname(req.url);

    var pathname = path.join(__dirname, "w", req.url)

    try {
        res.writeHead(200, {
            'content-type': MIME[ext] || 'text/plain;charset=utf-8'
        });
        res.write(fs.readFileSync(pathname));
    } catch (e) {
        res.writeHead(404, {
            'content-type': 'text/plain;charset=utf-8'
        });
        res.write('很抱歉！您要的页面找不到');
    }

    if (req.method === "GET") {
        var data = url.parse(req.url, true).query;
        res.end(JSON.stringify(data))
    } else {
        var arr = [];
        req.on('data', function(chunk) {
            arr.push(chunk);
        });
        req.on('end', function() {
            var obj = Buffer.concat(arr).toString();
            var data = qs.parse(obj);
            res.end(JSON.stringify(data));
        });
    }

});
server.listen(2233, function() { //监听
    console.log('----')
})