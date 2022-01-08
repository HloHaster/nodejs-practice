const http = require('http')

const HOSTNAME = 'localhost'
const PORT = 3000

module.exports = {
    find: async function (req, res) {
        try {
            const options = {
                hostname: HOSTNAME,
                port: PORT,
                path: '/posts',
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    if (serverResponse.statusCode >= 400 && serverResponse.statusCode <= 599) {
                        let error = JSON.parse(d)
                        res.render('error', {error: error.errorMessage, title: "Error"})
                        return
                    }
                    let posts = JSON.parse(d)
                    const havePosts = !!posts.length;
                    res.render('index', {havePosts, posts, title: "Home"})
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
                path: `/posts/${id}`,
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    if (serverResponse.statusCode >= 400 && serverResponse.statusCode <= 599) {
                        let error = JSON.parse(d)
                        res.render('error', {error: error.errorMessage, title: "Error"})
                        return
                    }
                    let post = JSON.parse(d)
                    const havePost = !!post;
                    res.render('modelpages/postPage', {havePost, post, title: `Post ${id}`})
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