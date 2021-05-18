const helper = {};

helper.isAutentificado = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/login");
}

helper.blockLogin  = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/user");
    }
    return next();
}

module.exports = helper;