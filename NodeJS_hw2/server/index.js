const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileLogger = require('./utils/fileLogger')

const PORT = 3000

const postsRoutes = require('./routes/posts')
const categoriesRoutes = require('./routes/categories')
const authorsRoutes = require('./routes/authors')
const tagsRoutes = require('./routes/tags')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const logger = (req, res, next) => {
    const loggerData = {
        rout: req.url,
        typeOfReq: req.method,
        params: req.params,
        body: req.body,
        datetime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    }

    fileLogger.log(loggerData)
    next();
}

app.use(logger)

app.use(postsRoutes)
app.use(categoriesRoutes)
app.use(authorsRoutes)
app.use(tagsRoutes)

const url = 'mongodb+srv://TanyaHlopenkova:1q2w3e4r@cluster0.nf0tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url, (error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log('It is connected')
    app.listen(PORT, () => {
        console.log('Server has been started')
    })
})