const express = require('express')
const bodyParser = require('body-parser');
const postsController = require('../controllers/posts');

const router = express.Router()
router.use(bodyParser.json());

router.get('/', postsController.find)

router.get('/posts', postsController.find);
router.get('/posts/:id', postsController.findOne);

module.exports = router