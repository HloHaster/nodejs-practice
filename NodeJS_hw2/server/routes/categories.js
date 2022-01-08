const express = require('express')
const bodyParser = require('body-parser');
const categoriesController = require('../controllers/categories');

const router = express.Router()
router.use(bodyParser.json());

router.get('/categories', categoriesController.find);
router.get('/categories/:id', categoriesController.findOne);
router.post('/categories', categoriesController.create);
router.put('/categories', categoriesController.update);
router.delete('/categories/:id', categoriesController.remove);

module.exports = router