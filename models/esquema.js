const mongoose = require("mongoose");
const { Schema } = mongoose;

//estos campos tienen q tener el mismo nombre del atributo name
const registro = new Schema({
    correo: { type: String, required:true },
    pass: { type: String, required:true },
});

module.exports = mongoose.model("reg", registro);