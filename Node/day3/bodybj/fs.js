var fs = require("fs");


// fs.readFile("./fs.js", function(err) {
//     console.log("我读完了！")
// });
// console.log("不会阻塞！")
var newcolor = process.argv[2] //
fs.readFile("./style.css", "UTF-8", function(err, data) {
    if (err) {
        console.log(1221)
    }
    console.log(newcolor)
    var oldcolor = data.split(":")[1].split(";")[0];
    data = data.replace(oldcolor, newcolor);
    fs.writeFileSync("./style.css", data);
});