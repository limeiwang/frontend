var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var zlib = require('zlib');
var ajax = require('ajax');
var MEMI = {
    '.js': 'text/javascript',
    '.html': 'text/html;charset=utf-8',
    '.css': 'text/css',
    '.png': 'image/png'
}
var server = http.createServer(function (req,res) {
    if(req.url === '/favicon.ico'){
        return;
    }
    var obj = url.parse(req.url,true);
    var query = obj.query;
    var pathname = obj.pathname;
    var ext = path.extname(pathname);
    if(ext) {// 文件
        if(pathname === '/ajax.js'){
            res.end(`${ajax}`);
        }else{
            try{  
                var st = fs.statSync(path.join(__dirname,'page',pathname));
                console.log(Math.round(st.size /1024 /1024) >1)
                if(Math.round(st.size /1024 /1024) >1){
                    console.log(path.join(__dirname,'page',pathname))
                    var rs = fs.createReadStream(path.join(__dirname,'page',pathname));
                    if(req.headers['accept-encoding'] && req.headers['accept-encoding'].indexOf('gzip') !== -1){
                        res.writeHead(200,{
                            'content-type':MEMI[ext] || 'text/plain',
                            'content-encoding': 'gzip'
                        });
                        var gzip = zlib.createGzip();
                        rs.pipe(gzip).pipe(res);
                    }else{
                        res.writeHead(200,{
                            'content-type':MEMI[ext] || 'text/plain'
                        });
                        rs.pipe(res);
                    }
                } else {
                    console.log(1)
                    var data = fs.readFileSync(path.join(__dirname,'page',pathname));
                    if(req.headers['accept-encoding'] && req.headers['accept-encoding'].indexOf('gzip') !== -1){
                        res.writeHead(200,{
                            'content-type':MEMI[ext] || 'text/plain',
                            'content-encoding': 'gzip'
                        });
                        res.end(zlib.gzipSync(data));
                    }else{
                        res.writeHead(200,{
                            'content-type':MEMI[ext] || 'text/plain'
                        });
                        res.end(data);
                    }
                }
                
                
            }catch(e) {
                res.writeHead(404);
                res.end(e.message);
            }
        }
    }else {//接口
        var content = {};
         fs.readdirSync(path.join(__dirname,'page','img')).map(function(file){
             var filename = path.join(__dirname,'page','img',file);
             var st = fs.statSync(filename);
             var size =  Math.round(st.size / 1024);
             if(st.size > query.minSize && size < query.maxSize){
                var obj = {
                    path : path.join('img',file),
                    size : size,
                    ctime : st.ctime
                }
                content[file] = obj;
                console.log(obj.path)
             }
         });
         res.end(JSON.stringify(content));
    }
    res.end('hello');
});

server.listen(8888,function () {
    console.log('listen this prot:'+server.address().port);
  })