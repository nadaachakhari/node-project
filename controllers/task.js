const Task = require("../models/Task")

const fetchTasks = (req, res) => {
    Task.find()
        .then((tasks) => {
            res.status(200).json(
            { model: tasks, message: "success" })
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "probléme d'extration",
            })
        })
}

const addTasks = (req, res) => {
    const task = new Task(req.body)
    task.save().then( () => {
        res.status(201).json({
            model: task,
            message: "Objet crée !",
        })
    })
    .catch((error) => {
        res.status(400).json({
            error: error.message,
        message: "données invalides",
        })
    })
}

const getTasksById = (req, res) => {
    Task.findOne({ _id: req.params.id})
        .then((task) => {
            if(!task) {
                res.status(404).json({
                    message: "Objet non trouvée",
                })
            }else{
                res.status(200).json({
                    model: task,
                    message: "Objet modifier",
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "probléme d'extration",
            })
        })
}

const updateTask = (req, res)=> {
    Task.findOneAndUpdate({ _id: req.params.id},
    
        req.body, { new: true })
        .then((task) => {
            if(!task) {
                res.status(404).json({
                    message: "Objet non trouvé",
                })
            }else{
                res.status(200).json({
                    model: task,
                    message: "Objet modifier",
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "probléme d'extration",
            })
        })
}

const deleteTask = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
    .then((tasks) => {
        res.status(200).json(
        { model: tasks, message: "objet supprimé" })
    })
    .catch((error) => {
        res.status(400).json({
            error: error.message,
        })
    })

}


module.exports = {
    fetchTasks: fetchTasks,
    addTasks: addTasks,
    updateTask: updateTask,
    getTasksById: getTasksById,
    deleteTask: deleteTask,
}

//meme ecriture : 
/* module.exports = {
    fetchTasks: fetchTasks,
    addTasks: addTasks,
    updateTask: updateTask,
    getTasksById: getTasksById,
    deleteTask: deleteTask,
}*/