

//it return a middlewarefunction
module.exports = function requireRole( role){
    return function(req, res, next){
         if (req.user.role === role){
        return next();
    }else{
        return res.status(403).json({error: "forbidden"})
    }

    }
}
