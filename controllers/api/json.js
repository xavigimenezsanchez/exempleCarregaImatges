
var router = require("express").Router();



router.get("/", function(req, res, next) {
    console.log("Estic al get");
    res.status(201).json({"missatge" : "hola mon!"});
});

router.post("/", function (req,res,next) {
    console.log("************************** estic a api/json ****************************");
    console.log(req.body);
    res.status(201).json({"missatge" : "hola mon!"});
    
});


module.exports = router;