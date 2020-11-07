//正确引用模块（5）；
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
//正确启动http服务器（20）；
var server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    console.log(req)
        //正确获取查询参数（5）；
    var query = url.parse(req.url, true).query;
    fs.readdir(path.join(__dirname, 'static', 'images'), function(err, paths) {
        if (err) {
            res.end('server wrong!');
        }
        paths.map(function(file) {
            var pathname = path.join(__dirname, 'static', 'images', file);
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
                            'content-type': "image/png"
                        });
                        var gzip = zlib.createGzip();
                        rs.pipe(gzip).pipe(res);
                    } else {
                        res.writeHead(200, {
                            'content-type': "image/png"
                        });
                        rs.pipe(res);
                    }
                } else {

                }
            });
        });
    });
});

server.listen(8888, function() {
    console.log("listen this prot:" + server.address().port)
})