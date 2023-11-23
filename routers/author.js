// authorRoutes.js
const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();


router.post('/', authorController.addAuthor)
router.get('/:authorId', authorController.getAuthorWithBooks) 
module.exports = router;