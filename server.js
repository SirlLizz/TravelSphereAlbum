let express = require('express');
let http = require('http');
let path = require('path');
let app = express();
let fs = require('fs');
let server = http.Server(app);
let info = require('./source/info.json').travels;

if(!checkInfoJson()){
    throw "Incorrect Json!";
}


app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/public/'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
    console.log('Run server by port 5000');
});

app.get('/info', function (request, response) {
    response.send(info)
});

app.get('/photo/:travel/:path/:start', (request, response) => {
    if(request.params.path.match("([^/:*?<>|\\\\]+(.(jpg|png|gif))$)")){
        const imagePath = __dirname+ '/source/images/' + request.params.travel + "/" + request.params.path;
        const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB
        const stat = fs.statSync(imagePath);
        const totalSize = stat.size;
    
        let start = Number(request.params.start);
        if (isNaN(start)) start = 0;
    
        const end = Math.min(start + CHUNK_SIZE, totalSize) - 1;
        const chunkSize = (end - start) + 1;
    
        response.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${totalSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'image/jpeg'
        });
    
        const stream = fs.createReadStream(imagePath, { start, end });
        stream.pipe(response);
    } else {
        response.sendStatus(400)
    }
});

function checkInfoJson(){
    if(!info || info.length == 0){
        return false;
    }
    for (const travel of info) {
        if (!travel.name) {
          return false;
        }
    }
    return true;
}
  