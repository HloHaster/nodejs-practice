const AuthorModel = require('../models/author');
const genericController = require('./genericController')

module.exports = {
    find: function (req, res) {
        genericController.findAllDocumentsAndSendResponse(req, res, AuthorModel)
    },

    findOne: function (req, res) {
        genericController.findOneDocumentByIdAndSendResponse(req, res, AuthorModel)
    },

    create: function (req, res) {
        const {name, email} = req.body;
        if (isStrEmpty(name) || isStrEmpty(email)) {
            res.status(400)
            res.json({errorMessage: "The author's name and email must not be empty"})
            return;
        }
        if (!isEmailValid(email)) {
            res.status(400)
            res.json({errorMessage: "The author's email is incorrect"})
            return;
        }

        genericController.saveDocumentAndSendResponse(req, res, AuthorModel)
    },

    update: function (req, res) {
        genericController.updateDocumentAndSendResponse(req, res, AuthorModel)
    },

    remove: function (req, res) {
        genericController.deleteDocumentAndSendResponse(req, res, AuthorModel)
    }
}

let isStrEmpty = (str) => {
    return !str || !str.trim();
}

function isEmailValid(email) {
    return emailRegex.test(email);
}

let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;