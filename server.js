let express = require("express");
let app = express();
let sassMiddleware =  require('node-sass-middleware');
let hostname = 'localhost';
let port = 8081;
let path = require('path');
let publicDir = path.join(__dirname, 'app');

app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

app.use(sassMiddleware ({
  src: __dirname,
  dest: publicDir,
  debug: true
}));

app.use(express.static(publicDir));

console.log(`Simple static server showing ${publicDir} \nListening at http://${hostname}:${port}`);
app.listen(port, hostname);