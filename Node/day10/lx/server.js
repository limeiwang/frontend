var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    var data = fs.readFileSync('./jquery-3.2.1.min.js');
    var acceptencoding = req.headers['accept-encoding'];
    if (acceptencoding && acceptencoding.indexOf('gzip') !== -1) {
        console.log("压缩")
    } else {
        console.log("未压缩")
    }
    res.end();
});
server.listen(8080, function() {
    console.log('----');
})