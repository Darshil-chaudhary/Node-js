const http = require("http");

let server = http.createServer((req,res)=>{
    res.end("welcome to my page")
})


server.listen(1111,()=>{
    console.log("Server is running on port no 1111")
})