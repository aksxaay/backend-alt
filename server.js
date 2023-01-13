const express = require("express");
const https = require("https");
const fs = require("fs");
const port = 3000;

var key = fs.readFileSync(__dirname + "/selfsigned.key");
var cert = fs.readFileSync(__dirname + "/selfsigned.crt");
var options = {
  key: key,
  cert: cert,
};

app = express();
app.get("/", (req, res) => {
  res.send("Now using https.. Hello World");
});

var server = https.createServer(options, app);

server.listen(port, () => {
  console.log("server starting on port : " + port);
});
