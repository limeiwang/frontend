var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var ajax = require('ajax');
var zlib = require('zlib');
var MIME = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html;charset=utf-8',
    '.png': 'image/png'
};
// 搭建服务器
var server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        return;
    };
    // 正确获取查询参数
    // 获取文件后缀名
    var obj = url.parse(req.url, true);
    // 获取地址栏的参数
    var query = obj.query;
    // 获取url地址中的后缀名
    var pathname = obj.pathname;
    var ext = path.extname(pathname);
    if (ext) {
        if (pathname === '/ajax.js') {
            res.end(`${ajax}`);
        } else {
            try {
                var st = fs.statSync(path.join(__dirname, 'static', pathname));
                if (st.size / 1024 / 1024 > 1) {
                    console.log('流的方式：' + pathname);
                    var rs = fs.createReadStream(path.join(__dirname, 'static', pathname));
                    if (req.headers['accept-encoding'] && req.headers['accept-encoding'].indexOf('gzip') !== -1) {
                        console.log('压缩');
                        res.writeHead(200, {
                            'content-type': MIME[ext] || 'text/plain',
                            'content-encoding': 'gzip'
                        });
                        var gzip = zlib.createGzip();
                        rs.pipe(gzip).pipe(res);
                    } else {
                        res.writeHead(200, {
                            'content-type': MIME[ext] || 'text/plain'
                        });
                        rs.pipe(res);
                    }
                } else {
                    console.log('返回小文件' + pathname);
                    var data = fs.readFileSync(path.join(__dirname, 'static', pathname));
                    if (req.headers['accept-encoding'] && req.headers['accept-encoding'].indexOf('gzip') !== -1) {
                        console.log('压缩');
                        res.writeHead(200, {
                            'content-type': MIME[ext] || 'text/plain',
                            'content-encoding': 'gzip'
                        });
                        res.end(zlib.gzipSync(data));
                        rs.pipe(gzip).pipe(res);
                    } else {
                        res.writeHead(200, {
                            'content-type': MIME[ext] || 'text/plain'
                        });
                        res.end(data);
                    }
                }
            } catch (e) {
                res.writeHead(404);
                res.end('no found');
            }
        }
    } else {
        // 1接收大小区间
        var content = {};
        // 读取文件
        fs.readdirSync('./static/images').forEach(function(file) {
            // 遍历查看文件详细信息
            var pathname = path.resolve('static', 'images', file);
            var st = fs.statSync(pathname);
            // 获取图片的大小
            var size = Math.round(st.size / 1024);
            // 根据条件返回文件
            if (size > query.minSize && size < query.maxSize) {
                // 返回文件大小 时间
                var obj = {
                    pic: path.join('images', file),
                    size: size,
                    ctime: st.ctime
                };
                content[file] = obj;
            };
        });
        res.end(JSON.stringify(content));
    }
}).listen(9898, function() {
    console.log('监听端口号:' + server.address().port + '...');
});