const express = require("express")
const router = express.Router()
const Task = require("../models/Book")
const bookController = require('../controllers/book')


//books

router.post("/api/books", bookController.addBook)

router.get('/api/books/', bookController.fetchBook)

router.patch("/api/books/:id", bookController.updateBook)


router.get("/api/books/:id", bookController.getByIdBook)


router.delete("/api/books/:id", bookController.deleteBook)

module.exports = router