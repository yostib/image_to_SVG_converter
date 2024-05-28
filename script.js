function convertToSVG() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    // Check if a file has been selected
    if (!file) {
        alert('Please choose an image first.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Get the original image dimensions
            const originalWidth = img.width;
            const originalHeight = img.height;
            
    

            // Create a high-resolution canvas with the same dimensions as the image
            const canvas = document.createElement('canvas');
            canvas.width = originalWidth;
            canvas.height = originalHeight;
            const ctx = canvas.getContext('2d');

            // Enable image smoothing and set the quality to high for better rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, originalWidth, originalHeight);

            // This is to Convert the canvas to a high-quality PNG data URL
            const dataUrl = canvas.toDataURL('image/png', 1.0); // '1.0' represents the highest quality

            // Create an SVG string with the high-quality embedded image
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${originalWidth}" height="${originalHeight}">
                    <image xlink:href="${dataUrl}" width="${originalWidth}" height="${originalHeight}" />
                </svg>
            `;

            // Create a Blob from the SVG string
            const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);

            // Update the download link with the URL and set the file name
            const downloadLink = document.getElementById('downloadLink');
            
            //The href attribute of the downloadLink element is set to the Blob URL
            downloadLink.href = url;
            downloadLink.download = 'image.svg';
            downloadLink.style.display = 'inline-block';

            // Inform the user that the image quality has been preserved
            const message = document.getElementById('message');
            message.textContent = `The image quality is preserved with dimensions ${originalWidth}x${originalHeight}px.`;
            message.style.display = 'block';
        };

        // Load the selected image file into the Image object
        img.src = event.target.result;
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(file);
}
