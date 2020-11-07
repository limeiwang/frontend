var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        return false;
    }
    res.write(fs.readFileSync('./ww/jquery-3.2.1.min.js'));
    res.end();
}).listen(8888);