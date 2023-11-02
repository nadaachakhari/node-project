const book = require("../models/Book")

const addBook = (req, res) =>{
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
}

const fetchBook = (req, res) => {

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
}

const updateBook = (req, res)=> {
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
}

const getByIdBook = (req, res) => {
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
}

const deleteBook =(req, res) => {
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

}

module.exports = {
    addBook,
    fetchBook,
    updateBook,
    getByIdBook,
    deleteBook,
}