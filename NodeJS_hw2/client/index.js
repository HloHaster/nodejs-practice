const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const PORT = 4000

const postsRoutes = require('./routes/posts')
const categoriesRoutes = require('./routes/categories')
const authorsRoutes = require('./routes/authors')
const tagsRoutes = require('./routes/tags')

const app = express()
const hbs = exphbs.create({
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.use(postsRoutes)
app.use(categoriesRoutes)
app.use(authorsRoutes)
app.use(tagsRoutes)

app.listen(PORT, () => {
    console.log('Server has been started')
})