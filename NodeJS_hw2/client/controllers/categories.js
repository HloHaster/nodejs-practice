const http = require('http')

const HOSTNAME = 'localhost'
const PORT = 3000

module.exports = {
    find: async function (req, res) {
        try {
            const options = {
                hostname: HOSTNAME,
                port: PORT,
                path: '/categories',
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    if (serverResponse.statusCode >= 400 && serverResponse.statusCode <= 599) {
                        let error = JSON.parse(d)
                        res.render('error', {error: error.errorMessage, title: "Error"})
                        return
                    }
                    let categories = JSON.parse(d)
                    const haveCategories = !!categories.length;
                    res.render('categories', {haveCategories, categories, title: "Categories"})
                })
            })

            serverRequest.on('error', err => {
                res.render('error', {error: 'Unexpected error', title: 'Error'})
            })

            serverRequest.end();
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', errorMessage: "Unexpected error occurred on the server"})
        }
    },

    findOne: async function (req, res) {
        try {
            const {id} = req.params;
            const options = {
                hostname: HOSTNAME,
                port: PORT,
                path: `/categories/${id}`,
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    if (serverResponse.statusCode >= 400 && serverResponse.statusCode <= 599) {
                        let error = JSON.parse(d)
                        res.render('error', {error: error.errorMessage, title: "Error"})
                        return
                    }
                    let category = JSON.parse(d)
                    const haveCategory = !!category;
                    res.render('modelpages/categoryPage', {haveCategory, category, title: `category ${id}`})
                })
            })

            serverRequest.on('error', err => {
                res.render('error', {error: 'Unexpected error', title: 'Error'})
            })

            serverRequest.end();
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', errorMessage: "Unexpected error occurred on the server"})
        }
    }
}