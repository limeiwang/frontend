var http = require('http');
var fs = require('fs');
var zlib = require('zlib');
var path = require('path');
var opt = {
    protocol: "http:",
    hostname: "localhost",
    port: "8080",
    path: "/",
    method: "get",
    headers: {
        // 'accept-encoding': 'gzip'
    }
}
http.get(opt, function(res) {
    var arr = [];
    res.on('data', function(chunk) {
        arr.push(chunk);
    });
    res.on('end', function() {
        var data = Buffer.concat(arr);
        if (res.headers['content-encoding'] === "gzip") {
            console.log('解压')
            zlib.unzip(data, function(err, decoded) {
                if (err) {
                    throw err;
                }
                fs.writeFileSync('./ww/bd.html', decoded);
            });
        } else {
            console.log('未解压')
            fs.writeFileSync('./ww/bd.html', data);
        }


    });
}).end();