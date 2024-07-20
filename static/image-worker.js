let CHUNK_SIZE = getChunkSize();

async function getImage(filePath){
	let start = 0;
	let chunks = [];
	let fetchNextChunk = true;
    document.querySelector(".loading-popup").style.display = "block";

	while (fetchNextChunk) {
		const chunk = await fetchChunk(filePath, start);
		chunks.push(chunk);

		if (chunk.size < CHUNK_SIZE) {
			fetchNextChunk = false;
		} else {
			start += CHUNK_SIZE;
		}
	}
    document.querySelector(".loading-popup").style.display = "none";

	const imageBlob = new Blob(chunks, { type: 'image/jpeg' });
	return URL.createObjectURL(imageBlob);
}

async function fetchChunk(filePath, start) {
	const response = await fetch(`photo/${filePath}/${start}`);
	const blob = await response.blob();
	return blob;
}

function getChunkSize() {
	fetch(`chunk_size`).then(
		response => response.json()
	).then(data => {
		CHUNK_SIZE = data.CHUNK_SIZE;
	});
}