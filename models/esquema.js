const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

//estos campos tienen q tener el mismo nombre del atributo name
const registro = new Schema({
    name: { type: String, required:true },
    cedula: { type: String, required:true },  
    direccion: { type: String, required:true },
    mobile: { type: String, required:true },  
    correo: { type: String, required:true },
    date: { type: String, required:true },  
    cod: { type: String, required:true },
    user: { type: String, required:true },  
    sexo: { type: String, required:true },
    tSangre: { type: String, required:true },
    eCivil: { type: String, required:true },
    img: {type: String, required:false},
    passconf: { type: String, required:true },
    clima: { type: String, required:false },
    pais: { type: String, required:false },
    color: { type: String, required:false },
    pelicula: { type: String, required:false },
    colegio: { type: String, required:false }
});

registro.methods.encryptPass = async(passconf)=>{
    const steps = await bcrypt.genSaltSync(10);
    return bcrypt.hash(passconf, steps);
};

registro.methods.decryptPass = async (passconf, pass)=>{
    return await bcrypt.compare(passconf, pass);
};

module.exports = mongoose.model("Users", registro);