const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.Url;

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,//true deprecated
    useUnifiedTopology: true
})
.then(db=>console.log("DB is Connected"))
.catch(err => console.log(err));
