const fs = require('fs')

function log(data) {
    let fileContent = "";
    try {
        fileContent = fs.readFileSync("logs/logs.json", "utf8");
    } catch (e) {
        fs.mkdir('logs', err => {
            if(err) throw err;
        });
    }

    let array;
    let length = fileContent.length

    if (length === 0) {
        array = [];
    } else {
        array = JSON.parse(fileContent)
    }
    array.push(data);
    let json = JSON.stringify(array, null, 4)
    fs.writeFile('logs/logs.json', json, (err) => {
        if (err) console.log(err);
    })
}

module.exports.log = log;