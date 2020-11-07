var fs = require('fs');

fs.readdir(__dirname + '/lib', function(err, paths) {
    if (err) {
        throw err;
    }
    paths.map(function(file) { //   file数组每一项
        var pn = __dirname + "/lib/" + file; //  fn 每一项的 路径
        fs.stat(pn, function(err, st) {
            if (err) {
                throw console.error(err);
            }
            var size = st.size / 1024 / 1024;
            if (size > 50) {
                //判断big是否存在
                // createDir('./big', size, pn, file)
                createDir('./big', function() {
                    var rs = fs.createReadStream(pn);
                    var ws = fs.createWriteStream(__dirname + '/big/' + file);
                    rs.pipe(ws);
                });

            } else {
                // createDir('./small', size, pn, file)
                createDir('./small', function() {
                    fs.writeFileSync(__dirname + '/small/' + file, fs.readFileSync(pn));
                });
            }
        });
    });
});


function createDir(dist, ck) {

    if (!fs.existsSync(dist)) {
        fs.mkdir(dist);
        ck && ck();
    } else {
        ck && ck();
    }
    // if (!fs.existsSync(dist)) {
    //     fs.mkdirSync(dist);
    //     if (size > 20) {
    //         var rs = fs.createReadStream(pn);
    //         var ws = fs.createWriteStream('./big/' + file);
    //         rs.pipe(ws);
    //     } else {
    //         fs.writeFileSync('./small/' + file, fs.readFileSync(pn));
    //     }
    // } else {
    //     if (size > 20) {
    //         var rs = fs.createReadStream(pn);
    //         var ws = fs.createWriteStream('./big/' + file);
    //         rs.pipe(ws);
    //     } else {
    //         fs.writeFileSync('./small/' + file, fs.readFileSync(pn));
    //     }
    // }
}