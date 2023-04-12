const urlToImage = (images, name,  mimeType) => {
    images.map((image, index) => {
        let ext = image.substring(11, 13)
        if (ext === 'jpe') ext ='jpeg'
        const filename = `${name}${index}.${ext}`
        mimeType = mimeType || (image.match(/^data:([^;]+);/)||'')[1];
        return (fetch(image)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename, {type:mimeType});})
        )
    })
}

module.exports = urlToImage