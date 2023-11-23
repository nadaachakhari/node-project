const express = require("express")
const app = express()
const mongoose = require("mongoose")
const taskRoutes = require("./routers/task")
const bookRoutes = require("./routers/book")
const userRoutes = require("./routers/user")
const authorRoutes = require("./routers/author")
const eventRoutes = require("./routers/eventRoutes")

mongoose
    .connect("mongodb+srv://nadachakhari00:jk6sjUyH0jL770eG@cluster0.jamxd1i.mongodb.net/Test",
    { useNewUrlParser: true, useUnifiedTopology: true 
    })
.then( () => console.log("connexion à MongoDB réussi"))
.catch((e) => console.log("connexion à MongoDB échouée",e))


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

app.use("/api/tasks", taskRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/author", authorRoutes)
app.use("/api/event", eventRoutes)



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

module.exports = app