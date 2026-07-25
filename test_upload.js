const fs = require('fs');

async function uploadImage() {
  try {
    const formData = new FormData();
    // Assuming test_image.jpg exists in the root directory
    const imageBuffer = fs.readFileSync('test_image.jpg');
    const blob = new Blob([imageBuffer], { type: 'image/jpeg' });
    formData.append('file', blob, 'test_image.jpg');

    console.log("Sending POST request to http://localhost:3001/api/upload...");
    const response = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

uploadImage();
