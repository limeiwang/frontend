var a = require('./lib');
a.str1 = "123";
// for (var k in require.cache) {
//     delete require.cache[k];
// }
var obj = require.cache;
Object.keys(obj).forEach(function(v) {
    delete obj[v];
});
var a1 = require('./lib');
console.log(require("ejs"));