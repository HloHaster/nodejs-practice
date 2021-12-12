const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    // 3.2 Обработата маршрута /json
    if (req.url === '/json') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end('{"name":"Tanya", "age":20, "car":null}');
        return;
    }

    // 3.5 Работа с типами (методами) запросов POST, PUT, DELETE, PATCH

    const baseURL =  req.protocol + '://' + req.headers.host + '/';
    const reqUrl = new URL(req.url,baseURL);
    console.log(reqUrl);

    if (req.method === 'GET' && req.url === '/get') {
        getMethod(req, res);
        return;
    }

    if (req.method === 'POST' && reqUrl.pathname === '/post') {
        postMethod(req, res, reqUrl);
        return;
    }

    if (req.method === 'PUT' && reqUrl.pathname === '/put') {
        putMethod(req, res, reqUrl);
        return;
    }

    if (req.method === 'PATCH' && reqUrl.pathname === '/patch') {
        console.log('In patch method but do post')
        postMethod(req, res, reqUrl);
        return;
    }

    if (req.method === 'DELETE' && reqUrl.pathname === '/delete') {
        deleteMethod(req, res, reqUrl);
        return;
    }

    // 3.3 Обработать маршруты (/ -> index.html, /about -> about.html, /services -> services.html)
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

    writeFile(objectFromFile);

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(objectFromFile));
}


function putMethod(req, res, reqUrl) {
    let object = {};

    let searchParams = reqUrl.searchParams;

    if(searchParams.has("name") && searchParams.has("surname") && searchParams.has("age")){
        object.name = searchParams.get("name");
        object.surname = searchParams.get("surname");
        object.age = searchParams.get("age");
    }

    writeFile(object);

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(object));
}

function deleteMethod(req, res, reqUrl) {
    let objectFromFile = JSON.parse(fs.readFileSync("./text/text.txt", "utf8"))

    let searchParams = reqUrl.searchParams;

    if(searchParams.has("name")){
        delete objectFromFile.name;
    }

    if(searchParams.has("surname")){
        delete objectFromFile.surname;
    }

    if(searchParams.has("age")){
        delete objectFromFile.age;
    }

    writeFile(objectFromFile);

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(objectFromFile));
}

function writeFile(obj) {
    const isExist = fs.existsSync('./text/text.txt')
    if (isExist) {
        fs.writeFile('./text/text.txt', JSON.stringify(obj), () => {
            console.log('text.txt was updated')
        })
    } else {
        console.log('text.txt was not updated')
    }
}