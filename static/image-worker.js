const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB

async function getImage(filePath){
	let start = 0;
	let chunks = [];
	let fetchNextChunk = true;

	while (fetchNextChunk) {
		const chunk = await fetchChunk(filePath, start);
		chunks.push(chunk);

		if (chunk.size < CHUNK_SIZE) {
			fetchNextChunk = false;
		} else {
			start += CHUNK_SIZE;
		}
	}

	const imageBlob = new Blob(chunks, { type: 'image/jpeg' });
	return URL.createObjectURL(imageBlob);
}

async function fetchChunk(filePath, start) {
	const response = await fetch(`photo/${filePath}/${start}`);
	const blob = await response.blob();
	return blob;
}