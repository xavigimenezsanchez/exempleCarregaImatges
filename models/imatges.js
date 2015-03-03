var db = require("../db");

var schema = new db.Schema({
    titol : {
        type : String,
        required : true
    },
    descripcio: {
        type : String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    extension:  {
        type: String,
        required: true
    }
});

var Imatge = db.model("Imatge", schema);
module.exports = Imatge;