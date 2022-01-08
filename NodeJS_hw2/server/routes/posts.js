const express = require('express')
const bodyParser = require('body-parser');
const postsController = require('../controllers/posts');

const router = express.Router()
router.use(bodyParser.json());

router.get('/posts', postsController.find);
router.get('/posts/:id', postsController.findOne);
router.post('/posts', postsController.create);
router.put('/posts/:id', postsController.update);
router.delete('/posts/:id', postsController.remove);

module.exports = router