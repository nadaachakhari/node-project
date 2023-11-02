const express = require("express")
const router = express.Router()
const Task = require("../models/Task")
const taskController = require('../controllers/task')
//bearer token dans postman
const auth = require("../middlewares/auth")


//l'ordre des middleware est trés important
router.post("/", auth.loggedMiddleware, auth.isAdmin, taskController.addTasks)

router.get("/", auth.loggedMiddleware,  taskController.fetchTasks)
router.patch("/:id", auth.loggedMiddleware,  taskController.updateTask)    

//get by id 
router.get("/:id", auth.loggedMiddleware,  taskController.getTasksById)


//delete
router.delete("/:id", auth.loggedMiddleware,  taskController.deleteTask)


module.exports = router
