var fs = require('fs');
var path = require('path');



function copyFile(src, callback) {
    fs.readdir(src, function(err, paths) {
        if (err) {
            throw err;
        }
        paths.map(function(file) {
            var pn = path.resolve(src, file);
            fs.stat(pn, function(err, st) {
                if (err) {
                    throw err;
                }
                if (st.isDirectory()) { //文件夹
                    copyFile(pn, callback)
                } else {
                    callback && callback(pn, st.size / 1024 / 1024);
                }
            })
        })
    });
}
copyFile('lib', function(pn, size) {
    if (size > 10) {
        createDir(path.join(__dirname, 'big'), function() {
            var rs = fs.createReadStream(pn);
            var ws = fs.createWriteStream(path.join(__dirname, 'big', path.basename(pn)));
            rs.pipe(ws);
        });
    } else {
        createDir(path.join(__dirname, 'small'), function() {
            // fs.writeFileSync(pn, fs.readFileSync(path.join(__dirname, 'small', path.basename(pn))));
            fs.readFile(pn, function(err, data) {
                if (err) {
                    throw err;
                }
                fs.writeFile(path.resolve('small', path.basename(pn)), data, function(err) {
                    if (err) {
                        throw err;
                    }
                })
            });
        });
    }
});

function createDir(dist, ck) {
    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
        ck && ck();
    } else {
        ck && ck();
    }
}