const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {

    // 3.2 Обработата маршрута /json
    if (req.url === '/json') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end('{"name":"Tanya", "age":20, "car":null}');
        return;
    }

    // 3.3 Обработать маршрутов (/ -> index.html, /about -> about.html, /services -> services.html)
    let filePath = path.join(__dirname, 'html', req.url === '/' ? 'index.html' : req.url)
    const ext = path.extname(filePath);

    if (!ext) {
        filePath += '.html'
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'html', '404page.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end(Error)
                } else {
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    })
                    res.end(data)
                }
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(content);
        }
    })



    // 3.5 Работа с типами (методами) запросов POST, PUT, DELETE, PATCH

    const baseURL =  req.protocol + '://' + req.headers.host + '/';
    const reqUrl = new URL(req.url,baseURL);
    console.log(reqUrl);

    if (req.method === 'GET' && req.url === '/get') {
        getMethod(req, res)
    }

    if (req.method === 'POST' && reqUrl.pathname === '/post') {
        postMethod(req, res, reqUrl);
    }
})


server.listen(3000, () => {
    console.log('Server has been started')
})


function getMethod (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    fs.readFile("./text/text.txt",  (err, data) => {
        if (err) {
            throw err
        } else {
            res.end(data);
        }
    })
}

function postMethod (req, res, reqUrl) {
    let objectFromFile = JSON.parse(fs.readFileSync("./text/text.txt", "utf8"))

    let searchParams = reqUrl.searchParams;

    if(searchParams.has("name")){
        objectFromFile.name = searchParams.get("name");
    }

    if(searchParams.has("surname")){
        objectFromFile.surname = searchParams.get("surname");
    }

    if(searchParams.has("age")){
        objectFromFile.age = searchParams.get("age");
    }

    const isExist = fs.existsSync('./text/text.txt')
    if (isExist) {
        fs.writeFile('./text/text.txt', JSON.stringify(objectFromFile), () => {
            console.log('text.txt was updated')
        })
    } else {
        console.log('text.txt was not updated')
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(objectFromFile));
}