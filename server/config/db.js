var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://AhmedRaza:AhmedRaza@cluster0.t2a80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;