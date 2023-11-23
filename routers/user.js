const express = require("express")
const router = express.Router()
const user = require("../models/user")
const userController = require('../controllers/user')
const validationMiddleware = require('../middlewares/validationMiddleware');

router.post("/signup", validationMiddleware.validateSignup, userController.signup)
router.post("/login", userController.login)

module.exports = router
