let info = {}
let base_image = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/3840px-Blue_Marble_2002.png";
const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';
const viewer = new PhotoSphereViewer.Viewer({
	container: document.querySelector("#viewer"),
	panorama: base_image,
	navbar: [
		"zoom",
		"markers",
		"markersList",
		"caption",
		"fullscreen",
	],
	minFov: 10,
	maxFov: 100,
	plugins: [
        [PhotoSphereViewer.MarkersPlugin]
	]
});
const markersPlugin = viewer.getPlugin(PhotoSphereViewer.MarkersPlugin);

window.onload = function(){
    getInfo().then( data => {
		info = data;
		openImage();
		setTravelsPoint();
	});
}

async function getInfo(){
    return await fetch('/info', {
        method: 'GET'
    }).then(res => {
        return res.json();
    })
}

async function openImage(num_travel=0, num_image=0){
	let imageInfo = info[num_travel].image_tree[num_image];
    let imagePath = imageInfo.image_path;
	markersPlugin.clearMarkers();
	let url = await getImage(imagePath);
	await viewer.setPanorama(url);
	viewer.setOption('caption', imageInfo.photo_name ? imageInfo.photo_name : '');
	setMarkers(num_travel, num_image);
}

function setTravelsPoint(){
    info.map((travel, num_travel) => {
		let item = document.createElement('div');
		item.className="item";
		item.innerHTML += `<h2>${travel.name}</h2>`;
		item.addEventListener('click', (event) => {
            openImage(num_travel)
        })
		document.querySelector(".scrolling-wrapper").appendChild(item);
	})
}


function setMarkers(num_travel, num_image){
	let points = info[num_travel].image_tree[num_image].link_points;
	if(points){
		points.map((point)=>{
			let captionNext = info[num_travel].image_tree[point.link_number].photo_name;
			markersPlugin.addMarker({
				id: '#' + Math.random(),
				circle: 20,
				position: { textureX: point.x, textureY: point.y },
				tooltip: captionNext ? captionNext : 'Слудующая точка',
				data:{
					num_travel: num_travel,
					link_number: point.link_number
				}
			});
		});
	}
}

markersPlugin.addEventListener('select-marker', ({ marker}) => {
    if (marker.data) {
		openImage(marker.data.num_travel, marker.data.link_number);
    }
});