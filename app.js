const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res)=>{
    console.log("Request received");
    res.end("Hello there");
});
server.listen(5002, (err)=>{
    if(err){
        console.log("There is an error");
    }
    console.log("Server listening");
})