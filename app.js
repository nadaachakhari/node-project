const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Task = require("./models/Task")
const Book = require("./models/Book")

mongoose
    .connect("mongodb+srv://nadachakhari00:jk6sjUyH0jL770eG@cluster0.jamxd1i.mongodb.net/Test",
    { useNewUrlParser: true, useUnifiedTopology: true 
    })
.then( () => console.log("connexion à MongoDB réussi"))
.catch((e) => console.log("connexion à MongoDB échouée",e))







/*app.use((req, res, next) => {
    console.log("requete reçue !")
    next()
})

app.use((req, res, next) => {
    res.status(201)
    next()
})


//middleware !!!
app.use((req, res, next) => {
    res.json({message: "votre requete a bien été reçue ! " })
    next()
})

app.use((req, res, next) => {
    console.log("réponse envoyée avec succés ! ")
    next()
})*/

app.use((req, res, next) => {
    res.setHeader("Access-control-Allow-origin","*")
    res.setHeader(
        "Acess-Control-Allow-Headers",
        "Origin, x-Requested-with, Content, Accept, Content-Type, Authorizaton"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
    })


app.use(express.json())

app
    .post("/api/tasks", (req, res) => {
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
    })
    

// app.get("/api/tasks", (req, res, next) => {
//     const todos = [
//         {
//             _id : "1",
//             title: "learn js",
//             duration: "30",
//         },
//         {
//             _id : "2",
//             title: "learn Nodejs",
//             duration: "40",
//         },
//         {
//             _id : "3",
//             title: "learn react",
//             duration: "60",
//         },
//     ]
//     res.status(200).json(todos)
// })

// app.get("/api/tasks/:id", (req, res)=>{
//     console.log(req.params.id)
//     res.send(req.params.id)
// })

// app.post("/api/tasks", (req, res)=>{
//     console.log(req.body)
//     res.send(req.body)
// })

// app.patch("/api/tasks/:id", (req, res)=> {
//     console.log(req.body)
//     console.log(req.params.id)
//     res.send(req.body)
// })

// app.delete("/api/tasks/:id", (req, res) => {
//     console.log(req.params.id)
//     //tsaker requette
//     res.send(req.body)
// })

app.get("/api/tasks/", (req, res) => {
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
})

app.patch("/api/tasks/:id", (req, res)=> {
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
})

//get by id 
app.get("/api/tasks/:id", (req, res) => {
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
})


//delete
app.delete("/api/tasks/:id", (req, res) => {
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

})




//books

app
    .post("/api/books", (req, res) =>{
        const book = new Book(req.body)
        book.save().then( () => {
            res.status(201).json({
                model: book,
                message: "Objet crée !",
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
            message: "données invalides",
            })
        })
    })

app.get('/api/books/', (req, res) => {

    Book.find()
    .then((books) => {
        res.send(books)
        res.status(200).json(
        { model: books, message: "bien affichée"}
         )
         .catch((error) => {
            res.status(400).json({
            error: error.message,
            message: "probléme d'extration",
            })
        })
    })
})

app.patch("/api/books/:id", (req, res)=> {
    Book.findOneAndUpdate({ _id: req.params.id},
    
        req.body, { new: true })
        .then((book) => {
            if(!book) {
                res.status(404).json({
                    message: "Objet non trouvé",
                })
            }else{
                res.status(200).json({
                    model: book,
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
})


app.get("/api/books/:id", (req, res) => {
    Book.findOne({ _id: req.params.id})
        .then((book) => {
            if(!book) {
                res.status(404).json({
                    message: "Objet non trouvée",
                })
            }else{
                res.status(200).json({
                    model: book,
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
})


app.delete("/api/books/:id", (req, res) => {
    Book.deleteOne({ _id: req.params.id })
    .then((books) => {
        res.status(200).json(
        { model: books, message: "objet supprimé" })
    })
    .catch((error) => {
        res.status(400).json({
            error: error.message,
        })
    })

})



module.exports = app

//erreur CORS !! 