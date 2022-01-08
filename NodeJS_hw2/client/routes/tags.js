const express = require('express')
const bodyParser = require('body-parser');
const tagsController = require('../controllers/tags');

const router = express.Router()
router.use(bodyParser.json());

router.get('/tags', tagsController.find);
router.get('/tags/:id', tagsController.findOne);

module.exports = router