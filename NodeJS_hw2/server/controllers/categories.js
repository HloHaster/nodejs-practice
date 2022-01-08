const CategoryModel = require('../models/category');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocumentsAndSendResponse(req, res, CategoryModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentByIdAndSendResponse(req, res, CategoryModel)
    },

    create: function (req, res) {
        const {name} = req.body;
        if (isStrEmpty(name)) {
            res.status(400)
            res.json({errorMessage: "The category name must not be empty"})
            return;
        }
        genericController.saveDocumentAndSendResponse(req, res, CategoryModel)
    },

    update: function (req, res) {
        genericController.updateDocumentAndSendResponse(req, res, CategoryModel)
    },

    remove: function (req, res) {
        genericController.deleteDocumentAndSendResponse(req, res, CategoryModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}