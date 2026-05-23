const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;
const dogs6Router = require("./dogs6");
const horses6Router = require("./horses6");
const trotting8Router = require("./trotting8");
const dogs8Router = require("./dogs8");
const fs = require("fs");
// Add headers
app.use(function (req, res, next) {
  // var origin = req.get('origin');

  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Operator, Authorization, ui-type, X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Type", "application/json");

  // Pass to next layer of middleware

  next();
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.send(`<html>
    <head>
      <title>PGVirtual V-Viewer - Demo Environment</title>
    </head>
      <body><h1>PGVirtual V-Viewer - Demo Environment</h1>
      <p>Hello from <strong>fake-api<strong>.</p><p>Go to <a href="" onclick="javascript:event.target.port=8090">V-Viewer</a> to see a running instance!<p>
      </body>
    </html>
  `);
});
app.use(cors());

app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

app.use("/dogs6", dogs6Router);
app.use("/horses6", horses6Router);
app.use("/trotting8", trotting8Router);
app.use("/dogs8", dogs8Router);
app.use("/123e.mp4", (req, res) => {
  const videoPath = __dirname + "/../dogs6/123e.mp4"; // Path to your video file
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

//app.use(express.static(__dirname + 'public'));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
