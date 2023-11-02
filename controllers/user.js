/*bcrypt et jsonwebtoken  utilisés pour gérer les tokens JWT (JSON Web Tokens) et le hachage des mots de passe.*/
const jwt = require("jsonwebtoken")
const bcrypt = require ("bcrypt")
const User = require("../models/user")

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) =>{
            const user = new User({
                email: req.body.email,
                password: hash,
            })
            user
            .save()
            .then((response) => {
                const newUser = response.toObject()
                delete newUser.password
                res.status(201).json({
                    user: newUser,
                    message: "Utilisateur créé ! "
                })
            })
            .catch((error) => res.status(400).json({error: error.message}))
        })
        .catch((error) => res.status(500).json({ error: error.message }))
}


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
        if (!user){
            return res
            .status(401)
            .json({ message: "login ou mot de passe inorrectes"})
        }
        bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
            if(!valid) {
                return res.status(401).json({message: "login ou mot de passe inorrectes"})
            }
            res.status(200).json({
                token: jwt.sign({ userId: user._id}, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                }),
            })
        })
        .catch((error) => res.status(400).json({error: error.message}))        
    })
    .catch((error) => res.status(400).json({error: error.message}))
}