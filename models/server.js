const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const bp = require("body-parser");
const passport = require("passport");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || process.env.AUXPORT;
    this.views = path.join(__dirname, "views");
    require("../config/passport");

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

    //Session
    this.app.use(session({
      secret: "secret",
      resave: true,
      saveUninitialized: true
    }))
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    //flash
    this.app.use(flash());

    //Variables globales Server
    this.app.use((req, res, next)=>{
      res.locals.correcto = req.flash("msg_correcto");
      res.locals.fallo = req.flash("msg_incorrecto");
      res.locals.user = req.user;
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
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
