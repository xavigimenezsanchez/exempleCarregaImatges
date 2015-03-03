var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");  //necessari per manegar multipart/form-data
var app = express();

app.use("/api/json",bodyParser.json());  // La api/json funcionarà amb bodyParser
app.use("/api/json",require("./controllers/api/json"));
app.use("/api/imatges",multer( {dest : "./uploads/"})); // uploads és la carpeta on aniran els fitxer quen es fa post
app.use("/api/imatges", require("./controllers/api/imatges")); // Per carregar imatges farem servir mutter

app.use("/",require("./controllers/static"));


app.listen(process.env.PORT, function() {
    console.log('Server listening on', process.env.PORT);
});

