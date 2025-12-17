// const fs = require('fs');
// const http = require('http');
// var mimeType = require('mime-types').lookup;

// const server = http.createServer((req, res)=>{
//      let path = req.url;
//      console.log("Requested path is >>> ", path);
//      if(path === '/'){
//         path = '/index.html';
//      }

//      let reqFile = '../Apple_Clone' + path;
//      console.log("Requested File >>> ", reqFile);

//      fs.readFile(reqFile,(err,content)=>{
//         if(err){
//             res.write('<h1> Page Not Found</h1>');
//             res.end();
//         }else{
//             res.writeHead(200,{"content-type":mimeType(path)});
//             res.write(content);
//             res.end();
//         }

//      })

// });

// server.listen(5002,(err)=>{
//     if(err){
//         console.error(err);
//     }
//     console.log("Server is running");
// })

const express = require('express');
const server = express();
server.use(express.static("../Apple_Clone"));
server.listen(3000,(err)=>{
    if(err)console.error(err);
    console.log("Server is running");
})