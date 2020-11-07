var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var formatdata = require('formatdata');
var ajax = require('ajax');
var userArr = [
    {name: '张三', pwd: '123456'},
    {name: '李四', pwd: '123'}
];
var MIME = {
    '.html': 'text/html;charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript'
};
var server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url, true).query;
    var ext = path.extname(pathname);
        if (pathname === '/ajax.js') {
            res.end(`${ajax}`);
        }else if (pathname === '/formatdata') {
            res.end(`${formatdata}`);
        } else {
            try {
                res.writeHead(200, {
                    'content-type': MIME[ext] || 'text/plain'
                });
                res.end(fs.readFileSync(path.join(__dirname, 'static', pathname)));
            } catch (e) {
                res.writeHead(404);
                res.end('not fount!');
            }
        }

server.listen(3333, function () {
    console.log('listen this port:' + server.address().port);
});