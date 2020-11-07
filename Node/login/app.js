var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
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
    if (ext) {
        // 文件
        if (pathname === '/ajax.js') {
            res.end(`${ajax}`);
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
    } else {
        // 接口
        if (req.method === 'GET') {
            switch (pathname) {
            case '/login':
                var flag = userArr.some(function (v) {
                    return query.name === v.name && query.pwd === v.pwd;
                });
                if (flag) {
                    res.end(JSON.stringify({code: 0, msg: '登陆成功'}));
                } else {
                    res.end(JSON.stringify({code: 2, msg: '用户名或密码错误'}));
                }
                break;
            case '/register':
                // 判断用户是否存在
                // console.log(query.name);
                var flag = userArr.some(function (v) {
                    return query.name === v.name;
                });
                if (!flag) {
                    userArr.push(query);
                    res.end(JSON.stringify({code: 0, msg: '注册成功'}));
                } else {
                    res.end(JSON.stringify({code: 2, msg: '该用户已存在请重新注册'}));
                }
                break;
            default:
                res.end(JSON.stringify({code: 1, msg: '未找到action'}));
                break;
            }
        }
    }
    res.end('hello');
});

server.listen(3333, function () {
    console.log('listen this port:' + server.address().port);
});