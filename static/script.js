let info = {}
let current_image = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/3840px-Blue_Marble_2002.png";

const viewer = new PhotoSphereViewer.Viewer({
	container: document.querySelector("#viewer"),
	panorama: current_image,
	navbar: [
		"zoom",
		"caption",
		"fullscreen",
	],
	minFov: 1,
	maxFov: 120,
});

window.onload = async function(){
    info = await getInfo();
	setBaseImage()
}

async function getInfo(){
    return await fetch('/info', {
        method: 'GET'
    }).then(res => {
        return res.json();
    })
}

function setBaseImage(){
    imagePath = info[0].image_tree[0].image_path;
	getImage(imagePath).then((url) => {
		viewer.setPanorama(url)
	})
}
