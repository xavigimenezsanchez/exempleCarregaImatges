var Imatge = require("../../models/imatges");
var router = require("express").Router();
var path = require('path');

var compressor = path.resolve(__dirname, '../../compressor.js');  // Fitxer que manipules les imatges
function compressAndResize (imageUrl) {
  // Creem un "child process" d'aquesta manera no 
  // fem un bloqueig del EventLoop amb un ús intens de la CPU
  // al processar les imatges
  var childProcess = require('child_process').fork(compressor);
  childProcess.on('message', function(message) {
    console.log(message);
  });
  childProcess.on('error', function(error) {   // Si el procés rep un missatge l'escriurà a la consola
    console.error(error.stack);
  });
  childProcess.on('exit', function() {  //Quan el procés rep l'event exit mostra un missatge a la consola
    console.log('process exited');
  });
  childProcess.send(imageUrl);
}


router.get("/", function(req, res, next) {
    Imatge.find(function(err,imatges) {
        if (err) return next(err);
        res.status(201).json(imatges);
    });
});


router.get("/:grandaria/:id", function(req, res, next) {
    // Aquest get ens donarà una imatge segons la grandària i el id de la imatge
    Imatge.findById(req.params.id, function(err,imatge) {
        if (err) return next(err);
        var options = {
            root: __dirname + '/../../images/'+req.params.grandaria+'/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
       
        var fileName = imatge.name;
        res.sendFile(fileName, options, function (err) {
            if (err) {
              console.log(err);
              res.status(err.status).end();
            }
            else {
              console.log('Enviat:', fileName);
            }
          });
    });
})

router.post("/", function (req,res,next) {
    console.log(req.files.image);
    console.log(req.body);
    var imatge = new Imatge({
        titol: req.body.titol,
        descripcio: req.body.descripcio,
        originalName: req.files.image.originalname,
        name : req.files.image.name,
        extension: req.files.image.extension
    });
    
    imatge.save(function(err,imatge) {
        if (err) return next(err);
        compressAndResize(__dirname+"/../../uploads/" + req.files.image.name);
        res.status(201).json(imatge);
    });
    
});

router.post("/json", function(req,res, next) {
    
    res.status(201).json({"missatge" : "Post rebut!"});
});
module.exports = router;