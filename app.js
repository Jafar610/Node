const fs = require('fs');
const http = require('http');
 var mimeType = require('mime-types').lookup;

const server = http.createServer((req,res)=>{
    let reqPath = req.url;
    console.log('requested path >>>',req.url);
    if(reqPath === '/'){
        reqPath = '/index.html';
    }
    let pathFile = '../barber_shop' + reqPath;
    console.log('requested file >>>', pathFile);
    fs.readFile(pathFile,(err,content)=>{
        if(err){
            res.write('<h1>Page Not Found</h1>');
            res.end();
        }
        else{
            res.writeHead(200, {"content-type":mimeType(reqPath)});
            res.write(content);
            res.end();
        }
    })
});

server.listen(5001,(err)=>{
    if(err) throw err;
    console.log('server is running');
})
