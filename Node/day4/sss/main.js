var fs = require('fs');

fs.readdir(__dirname + '/lib', function(err, paths) {
    if (err) {
        throw err;
    }
    paths.map(function(file) { //文件名a.wmv
        var pn = __dirname + "/lib/" + file; //a.wmv全路径
        fs.stat(pn, function(err, st) {
            if (err) {
                throw console.error(err);
            }
            var size = st.size / 1024 / 1024;
            if (size > 50) {
                //判断big是否存在
                var exist = fs.existsSync(__dirname + '/big');
                if (!exist) {
                    //创建
                    fs.mkdirSync(__dirname + '/big');
                    var rs = fs.createReadStream(pn);
                    var ws = fs.createWriteStream(__dirname + '/big/' + file);
                    rs.pipe(ws);
                } else {
                    //拷贝
                    var rs = fs.createReadStream(pn);
                    var ws = fs.createWriteStream(__dirname + '/big/' + file);
                    rs.pipe(ws);
                }

            } else {
                var exist = fs.existsSync(__dirname + '/small');
                if (!exist) {
                    fs.mkdirSync(__dirname + '/small');
                    // var data = fs.readFileSync(pn);
                    fs.writeFileSync(__dirname + '/small/' + file)
                } else {
                    // var data = fs.readFileSync(pn);
                    fs.writeFileSync(__dirname + '/small/' + file)
                }
            }
        })
    });
});