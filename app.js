const http = require("http");
const fs = require("fs");

let resB,resC,startB,startC;

function formatTime(d) {
    return d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+","+d.getMilliseconds();
}

function responseB() {
    resB.writeHead(200, "{'Content-type':'application/json'}");
    let obj = {};
    obj.url = "B"
    obj.startTime = formatTime(startB);
    obj.endTime = formatTime(new Date());
    resB.end(JSON.stringify(obj));
}
function responseC() {
    resC.writeHead(200, "{'Content-type':'application/json'}");
    let obj = {};
    obj.url = "C"
    obj.startTime = formatTime(startC);
    obj.endTime = formatTime(new Date());
    resC.end(JSON.stringify(obj));
}

function main(req,res) {
    if (req.url == "/b") {
        startB = new Date();
        resB = res;
        setInterval(responseB,1000);
    } else if (req.url == "/c") {
        startC = new Date();
        resC = res;
        setInterval(responseC,1000);
    } else {
        res.writeHead(200, "{'Content-type':'text/html'}");
        res.end(fs.readFileSync("index.html"));
    }
}

http.createServer(main).listen(8080);