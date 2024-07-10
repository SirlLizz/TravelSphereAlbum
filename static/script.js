let info = {}
var current_image = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/3840px-Blue_Marble_2002.png";

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
	viewer.setPanorama("photo/" + imagePath)
}

// file_selector.onchange = e => {
// 	let new_file = e.target.files[0];
// 	console.log(new_file);
// 	setImage(new_file);
// }

function setImage(image) {
	console.log(image)
	let reader = new FileReader();
	reader.addEventListener(
		"load",
		() => {
			viewer.setPanorama(reader.result).then(
				value => {
					current_image = reader.result;
				},
				reason => {
					alert(reason);
					viewer.setPanorama(current_image);
				},
			);
		},
		false
	);
	reader.readAsDataURL(image);
}