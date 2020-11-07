// 案例：文件目录的克隆
// 1.引入
var fs = require('fs');
var path = require('path');

// 2.函数
function copyFile(pn, dn, callback) {
    fs.readdir(pn, function(err, paths) {
        if (err) {
            throw err;
        }
        paths.map(function(file) {
            var pathname = path.join(pn, file);
            var dirname = path.join(dn, file);
            fs.stat(pathname, function(err, st) {
                if (err) {
                    throw err;
                }
                if (st.isFile()) { //文件
                    callback && callback(pathname, dirname, st.size / 1024 / 1024);
                } else { //文件夹
                    fs.exists(dirname, function(exist) {
                        if (!exist) {
                            fs.mkdirSync(dirname);
                            copyFile(pathname, dirname, callback)
                        }
                    })
                }
            })
        })
    });
}
copyFile(path.resolve('lib'), path.resolve('paths'), function(pathname, dirname, size) {
    if (size > 30) {
        var rs = fs.createReadStream(pathname);
        var ws = fs.createWriteStream(dirname);
        rs.pipe(ws)
    } else {
        fs.writeFileSync(dirname, fs.readFileSync(pathname));
    }
});