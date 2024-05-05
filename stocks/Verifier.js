const jwt = require('jsonwebtoken')

// Verifier Authentication
function isAuthenticated(req,res,next){
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401).send("Non Authorisé")
    jwt.verify(token , "idrisswa3r",(err,user)=>{
      if(err) return res.sendStatus(401).send("Non Autorisé")
      req.user = user
      next()
    })
}
