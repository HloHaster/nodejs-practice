const express = require('express')
const bodyParser = require('body-parser');
const authorsController = require('../controllers/authors');

const router = express.Router()
router.use(bodyParser.json());

router.get('/authors', authorsController.find);
router.get('/authors/:id', authorsController.findOne);

module.exports = router