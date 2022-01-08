let mongoose = require('mongoose')

let findAllDocumentsAndSendResponse = (req, res, documentModel) => {
    documentModel
        .find()
        .then(documents => {
            res.json(documents)
        })
        .catch(e => {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        })
}

let findOneDocumentByIdAndSendResponse = (req, res, documentModel) => {
    const {id} = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
        documentModel
            .findOne({"_id": id})
            .then(document => {
                res.json(document)
            })
            .catch(e => {
                res.status(404)
                res.json({errorMessage: "There is no entity with such id"})
            })
    } else {
        res.status(400)
        res.json({errorMessage: "Id is invalid"})
    }
}

let saveDocumentAndSendResponse = (req, res, documentModel) => {
    const doc = req.body

    delete doc.createdAt
    delete doc.updatedAt
    let document = new documentModel(doc)

    document.save()
        .then(document => {
            res.json(document)
        })
        .catch(e => {
            res.status(500)
            res.json({errorMessage: "Unexpected error occurred on the server"})
        })
}

let updateDocumentAndSendResponse = (req, res, documentModel) => {
    const document = req.body
    const {id} = req.params;

    delete document.createdAt
    delete document.updatedAt

    if (mongoose.Types.ObjectId.isValid(id)) {
        documentModel
            .findByIdAndUpdate(id, document, {new: true})
            .then(document => {
                res.json(document)
            })
            .catch(e => {
                res.status(404)
                res.json({errorMessage: "There is no entity with such id"})
            })
    } else {
        res.status(400)
        res.json({errorMessage: "Id is invalid"})
    }
}

let deleteDocumentAndSendResponse = (req, res, documentModel) => {
    const {id} = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        documentModel
            .findByIdAndDelete(id)
            .then(document => {
                res.json(document)
            })
            .catch(e => {
                res.status(404)
                res.json({errorMessage: "There is no entity with such id"})
            })
    } else {
        res.status(400)
        res.json({errorMessage: "Id is invalid"})
    }
}


module.exports.findAllDocumentsAndSendResponse = findAllDocumentsAndSendResponse;
module.exports.findOneDocumentByIdAndSendResponse = findOneDocumentByIdAndSendResponse;
module.exports.saveDocumentAndSendResponse = saveDocumentAndSendResponse;
module.exports.updateDocumentAndSendResponse = updateDocumentAndSendResponse;
module.exports.deleteDocumentAndSendResponse = deleteDocumentAndSendResponse;

