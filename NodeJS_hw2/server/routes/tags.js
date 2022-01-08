const express = require('express')
const bodyParser = require('body-parser');
const tagsController = require('../controllers/tags');

const router = express.Router()
router.use(bodyParser.json());

router.get('/tags', tagsController.find);
router.get('/tags/:id', tagsController.findOne);
router.post('/tags', tagsController.create);
router.put('/tags', tagsController.update);
router.delete('/tags/:id', tagsController.remove);

module.exports = router