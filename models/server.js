const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const bp = require("body-parser");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.views = path.join(__dirname, "views");

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {

    //Handelbars
    this.app.engine(".hbs", hbs({
      defaultLayaut: "main",
      layautDir: path.join(this.views, "layouts"),
      partialDir: path.join(this.views, "partials"),
      extname: ".hbs"
    }));

    this.app.use(session({
      secret: "xD",
      resave: true,
      saveUninitialized: true
    }))
    //flash
    this.app.use(flash());

    //Variables globales Server
    this.app.use((req, res, next)=>{
      res.locals.correcto = req.flash("msg_correcto");
      res.locals.fallo = req.flash("msg_incorrecto");
      res.locals.User = false || null;
      next();
    });

    //DB
    require("../database");
    // CORS
    this.app.use(cors());

    // Directorio público
    this.app.use(express.static("public"));


    this.app.set("view engine", ".hbs");

    this.app.use(bp.urlencoded({ extended: false}));//Post

     // Lectura y parseo del body
    this.app.use(bp.json());
  }

  routes() {
    this.app.use(require("../routes"));
    this.app.use(require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
