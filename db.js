var mongoose = require("mongoose");
mongoose.connect("mongodb://xavi:PatatA81@ds039421.mongolab.com:39421/xaviproves", function() {
    console.log('Connectat a mongodb');
});

module.exports = mongoose;