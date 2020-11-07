//正确引用模块（5）；
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var ax = require('ajax');
console.log(require('ajax'))
var MIME = {
    ".html": "text/html;charset=utf-8",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/image"
}

//正确启动http服务器（20）；
var server = http.createServer(function(req, res) {
    if (req.url === "/favicon.ico") {
        return;
    }
    //正确获取查询参数
    var query = url.parse(req.url, true).query;

    var pathname = url.parse(req.url).pathname;
    var ext = path.extname(pathname);
    console.log(pathname);
    if (ext) {
        try {
            var filepath = path.join(__dirname, 'static', pathname);


        } catch (e) {
            res.writeHead(404);
            res.end('not found!')
        }
    } else {

    }

    fs.readdir('./static/images', function(err, paths) {
        if (err) {
            res.end('server wrong!');
        }
        paths.map(function(file) {
            var pathname = path.resolve("static", "images", file);
            fs.stat(pathname, function(err, st) {
                if (err) {
                    res.end('server wrong!');
                }
                var size = Math.round(st.size / 1024);
                if (size > query.minSize && size < query.maxSize) {
                    var rs = fs.createReadStream(pathname);
                    var acceptencoding = req.headers['accept-encoding'];
                    if (acceptencoding && acceptencoding.indexOf('gzip') !== -1) {
                        res.writeHead(200, {
                            'content-encoding': 'gzip',
                            'content-type': 'image/png'
                        });
                        var gzip = zlib.createGzip();
                        rs.pipe(gzip).pipe(res)
                    } else {
                        res.writeHead(200, {
                            'content-type': 'image/png'
                        });
                        rs.pipe(res)
                    }
                } else {

                }
            })
        });
    });

});

server.listen(8000, function() {
    console.log('listen this port' + server.address().port);
});