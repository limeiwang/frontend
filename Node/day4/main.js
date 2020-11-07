var fs = require("fs");

// fs读取文件
// fs.readFile('./lib/a.js', 'UTF-8', function(err, data) {
//     if (err) {
//         throw err;
//     }
//     console.log(data)
// });

// fs写入文件 文件不存在则创建，存在则替换内容
// fs.writeFile('./lib/c.js', 'console.log(a)', function(err) {
//     if (err) {
//         throw err;
//     }
// })

// fs向文件追加内容
// fs.appendFile('./lib/c.js', '123', function(err) {
//     if (err) {
//         throw err;
//     }
// })

// fs读取文件目录夹  数组，代表文件夹中所以内容的集合
// fs.readdir('./lib', function(err, paths) {
//     if (err) {
//         throw err;
//     }
//     console.log(paths)
// });

//fs创建文件夹