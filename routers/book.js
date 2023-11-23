const express = require("express")
const router = express.Router()
const Book = require("../models/Book")
const auth = require("../middlewares/auth")
const BookController = require("../controllers/book")
router.use(express.json()) 

//books

router.post("/", BookController.addBook)

//book wih validation :
router.post("/", BookController.createdBook)

router.get('/fetch', BookController.fetchBook)

router.patch("/api/books/:id", BookController.updateBook)


router.get("/api/books/:id",auth.loggedMiddleware,auth.isAdmin, BookController.getByIdBook)


router.delete("/api/books/:id", BookController.deleteBook)


router.route("/category").post(BookController.addCategory)


router.get("/author/:id",BookController.getBookAuthor)

router.get("/authors/:id",BookController.getBookWithAuthor)

router.get('/:authorId/books', BookController.getBookByAuthorID);

module.exports = router