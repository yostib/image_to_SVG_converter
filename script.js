function convertToSVG() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + img.width + '" height="' + img.height + '"><image xlink:href="' + canvas.toDataURL("image/png") + '" width="' + img.width + '" height="' + img.height + '"/></svg>';

            const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = url;
            downloadLink.download = 'image.svg';
            downloadLink.style.display = 'inline-block';
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}
