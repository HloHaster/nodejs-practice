const TagModel = require('../models/tag');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocumentsAndSendResponse(req, res, TagModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentByIdAndSendResponse(req, res, TagModel)
    },

    create: function (req, res) {
        const {name} = req.body;
        if (isStrEmpty(name)) {
            res.status(400)
            res.json({errorMessage: "The tag name must not be empty"})
            return;
        }
        genericController.saveDocumentAndSendResponse(req, res, TagModel)
    },

    update: function (req, res) {
        genericController.updateDocumentAndSendResponse(req, res, TagModel)
    },

    remove: function (req, res) {
        genericController.deleteDocumentAndSendResponse(req, res, TagModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}