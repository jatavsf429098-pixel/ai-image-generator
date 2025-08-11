document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const generatedImage = document.getElementById('generated-image');
    const placeholderText = document.getElementById('placeholder-text');
    const loadingSpinner = document.getElementById('loading-spinner');

    // NOTE: This is the URL of your backend.
    // For local testing, use http://localhost:5000
    // For deployment, replace with your deployed backend URL (e.g., https://your-app-name.vercel.app)
    const BACKEND_URL = 'http://localhost:5000/generate-image';

    generateBtn.addEventListener('click', generateImage);
    promptInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            generateImage();
        }
    });

    async function generateImage() {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('Please enter a prompt to generate an image.');
            return;
        }

        placeholderText.style.display = 'none';
        generatedImage.style.display = 'none';
        loadingSpinner.style.display = 'block';
        generateBtn.disabled = true;

        try {
            // Do NOT put your API key here. The backend handles the key securely.
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate image from backend.');
            }

            const data = await response.json();
            const imageUrl = data.imageUrl;

            generatedImage.src = imageUrl;
            generatedImage.onload = () => {
                loadingSpinner.style.display = 'none';
                generatedImage.style.display = 'block';
                generateBtn.disabled = false;
            };

        } catch (error) {
            console.error('Error generating image:', error);
            loadingSpinner.style.display = 'none';
            placeholderText.textContent = `Error: ${error.message}`;
            placeholderText.style.display = 'block';
            generateBtn.disabled = false;
        }
    }
});
