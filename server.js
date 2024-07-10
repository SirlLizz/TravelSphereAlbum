let express = require('express');
let http = require('http');
let path = require('path');
let app = express();
let server = http.Server(app);

let info = require('./source/info.json').travels;

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
})

app.get('/photo/:travel/:path', function (request, response) {
    if(request.params.path.match("([^/:*?<>|\\\\]+(.(jpg|png|gif))$)")){
        response.sendFile(__dirname+ '/source/images/' + request.params.travel + "/" + request.params.path);
    } else{
        response.sendStatus(400)
    }
})