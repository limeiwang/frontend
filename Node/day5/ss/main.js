//1、引入
var fs = require('fs');
var path = require('path');

//2、
function cyclic(src) {
    fs.readdir(src, function(err, pahts) {
        if (err) {
            throw err;
        }
        (function cyc(i, len) {
            if (i < len) {
                var pathname = path.join(src, pahts[i]);
                var ext = path.extname(pathname);
                switch (ext) {
                    case ".js":
                        createDir(path.resolve('scripts'), pathname, function() {
                            fs.readFile(pathname, function(err, data) {
                                if (err) {
                                    throw err;
                                }
                                fs.appendFile(path.resolve('scripts', 'all.min.js'), data, function(err) {
                                    if (err) {
                                        throw err
                                    }
                                    cyc(i + 1, len);
                                });
                            });
                        });
                        break;
                    case ".css":
                        createDir(path.resolve('css'), pathname, function() {
                            fs.readFile(pathname, function(err, data) {
                                if (err) {
                                    throw err;
                                }
                                fs.appendFile(path.resolve('css', 'styleall.min.css'), data, function(err) {
                                    if (err) {
                                        throw err
                                    }
                                    cyc(i + 1, len);
                                });
                            });
                        });
                        break;
                }

            }
        })(0, pahts.length)
    });
}
cyclic(path.resolve('script'));


function createDir(dist, pn, ck) {
    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
        ck && ck();
    } else {
        ck && ck();
    }
}