const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const user = require("../models/user")


module.exports.loggedMiddleware = (req, res, next) => {
  try {
    //accéder a token
    //split changer chaine en tableau
    //verify(traj3lk el token) w sign(tasne3 token)
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
    const userId = decodedToken.userId
    // TODO findone user
    User.findOne({ _id: userId })
      .then((response) => {
        if (response){
          //auth: objet 
          req.auth = {
            userId: userId,
            role: response.role,
          }
          next()
        }else{
          res.status(401).json({ error: "user doesn't exist"})
        }
      }).catch((error) => {
        res.status(500).json({ error: error.message})
      });

  } catch (error) {
    res.status(401).json({ error })
  }
}

  module.exports.isAdmin = (req, res, next) =>{
    try{
      if (req.auth.role === "admin"){
        next()
      } else {
        res.status(403).json({ error: "no access to this route"})
      }
    } catch(e){
      res.status(401).json({ error: error.message })
    }

  }

