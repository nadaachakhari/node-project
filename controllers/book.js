const Book = require("../models/Book")
const Category = require("../models/Category");

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


//add book with validator :
const createdBook = async (req, res) => {
    try {
      const book = new Book(req.body);
  
      // Valider le livre avec mongoose avant de sauvegarder
      await book.validate();
  
      // Vérifier si l'auteur a des anciens livres
      const authorId = book.authorId;
      const authorBooksCount = await Book.countDocuments({ authorId: authorId });
  
      if (authorBooksCount > 0) {
        // L'auteur a des anciens livres, sauvegarder le nouveau livre
        await book.save();
  
        res.status(201).json({
          model: book,
          message: 'Objet créé !',
        });
      } else {
        // L'auteur n'a pas d'anciens livres
        res.status(400).json({
          message: 'L\'auteur doit avoir écrit d\'autres livres avant de créer celui-ci.',
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: 'Données invalides',
      });
    }
  };
  


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


const addCategory=(async(req,res,next)=>{
    try {
        console.log(req.body)
       const category=await Category.create(req.body) 
       res.status(201).json(category)
    } catch (error) {
        console.error(error);
        res.json(500).json(error)
    }
})


const getBookWithAuthor = async (req, res) => {
    try {
        const AuthorId = req.params.id;
        const book = await Book.findById(AuthorId)
        
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du livre avec son auteur', error: error.message });
    }
};



const getBookAuthor =async (req, res, next) =>{
    {try {
    const authorId = req.params.id;
    const books = await Book.findByAuthor(authorId);

    if (books.length == 0) {
      return res.status(404).json({ message: 'Aucun livre trouvé pour cet auteur.' });
    }else{
        res.json(books);
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
}
}

const getBookByAuthorID = (async (req, res) => {
    const authorId = req.params.authorId; 

    try {
      const books = await Book.findByAuthor(authorId);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch books by author', message: err.message });
    }
  }
)


module.exports = {
    addCategory,
    addBook,
    fetchBook,
    updateBook,
    getByIdBook,
    deleteBook,
    getBookAuthor,
    getBookWithAuthor,
    getBookByAuthorID,
    createdBook,
}