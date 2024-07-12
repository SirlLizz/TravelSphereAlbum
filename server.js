let express = require('express');
let http = require('http');
let path = require('path');
let app = express();
let fs = require('fs');
let server = http.Server(app);
let info = require('./source/info.json').travels;

checkInfoJson()

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
        throw "Doesn't contains travels!";
    }
    info.map((travel, num_travel) => {
        if (!travel.name) {
            throw `Travel with number ${num_travel} doesn't contains name!`;
        }
        //Date не обязательное поле
        if(!travel.image_tree || travel.image_tree.length == 0){
            throw `Travel with number ${num_travel} doesn't contains images!`;
        }
        let image_count = travel.image_tree.length;
        travel.image_tree.map((image, num_image) => {
            if (!image.image_path) {
                throw `Travel with number ${num_travel} doesn't have path by ${num_image} image!`;
            }
            if(!image.image_path.match("([^/:*?<>|\\\\]+(.(jpg|png|gif))$)")){
                throw `Travel with number ${num_travel} have incorrect path by ${num_image} image!`;
            }
            if(image.link_points && image.link_points.length != 0){//Тоже могут быть пустыми
                image.link_points.map((point, num_point) => {
                    if(!point.x || !point.y){
                        throw `Travel with number ${num_travel} have incorrect coords by ${num_point} point by ${num_image} image!`;
                    }
                    if(point.link_number >= image_count){
                        throw `Travel with number ${num_travel} have incorrect link number by ${num_point} point by ${num_image} image!`;
                    }
                })
            }
        })
    })
    return true;
}
  