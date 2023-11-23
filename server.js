/*const http = require("http")

const server = http.createServer((req, res) => {
    res.end("voila la réponser du serveur !!!!")
})

server.listen(process.env.PORT || 5000) */


const http = require("http")
const app = require("./app")
const port = process.env.PORT || 3000 
//creer variable port dans app
app.set("port", port)
const server =  http.createServer(app)
server.listen(port, () => {
    console.log("Listening on " + port)
})

//res.send : envoyer tout format
//