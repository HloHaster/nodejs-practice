const PostModel = require('../models/post');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocumentsAndSendResponse(req, res, PostModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentByIdAndSendResponse(req, res, PostModel)
    },

    create: function (req, res) {
        const {name, body} = req.body;
        if (isStrEmpty(name) || isStrEmpty(body)) {
            res.status(400)
            res.json({errorMessage: "The post's name and body must not be empty"})
            return;
        }
        genericController.saveDocumentAndSendResponse(req, res, PostModel)
    },

    update: function (req, res) {
        genericController.updateDocumentAndSendResponse(req, res, PostModel)
    },

    remove: function (req, res) {
        genericController.deleteDocumentAndSendResponse(req, res, PostModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}