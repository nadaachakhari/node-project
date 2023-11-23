const authorModel = require("../models/Author");
const Book = require("../models/Book")

const addAuthor = (async (req,res)=>{
    try{
        const author = await authorModel.create(req.body);
        res.status(200).json(author);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
const getAuthorWithBooks = async (req,res) => {
    try {
      const author = await authorModel.findById(req.params.authorId).populate('books'); 
      res.status(200).json(author);
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
  };
module.exports = {
    addAuthor:addAuthor,
    getAuthorWithBooks:getAuthorWithBooks
}