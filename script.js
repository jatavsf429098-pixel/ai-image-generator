// script.js — sample client-side code

// IMPORTANT SECURITY NOTE:
// Do NOT embed a private API key directly into client-side JavaScript for production —
// this example shows the client-side flow to call a server endpoint or a generic API.
// For production, put your API key on a server (serverless function, small proxy) and call that.

const generateBtn = document.getElementById('generateBtn');
const promptEl = document.getElementById('prompt');
const imagesWrap = document.getElementById('images');
const placeholder = document.getElementById('placeholder');
const sizeEl = document.getElementById('size');
const numImagesEl = document.getElementById('numImages');

// Replace this with your actual endpoint. For best security, point this to a server-side
// endpoint (e.g. /api/generate) that you control. The server will call the external
// image generation provider (OpenAI DALL·E, Stable Diffusion endpoint, etc.) using a
// private API key.
const API_ENDPOINT = 'https://your-server.example.com/api/generate';

function showPlaceholder(show){
  placeholder.style.display = show ? 'block' : 'none';
}

async function generateImages(){
  const prompt = promptEl.value.trim();
  if(!prompt){
    alert('Please enter a description.');
    return;
  }

  const size = sizeEl.value; // e.g. "512x512"
  const n = Math.min(Math.max(parseInt(numImagesEl.value)||1,1),4);

  generateBtn.disabled = true;
  generateBtn.textContent = 'Generating...';
  showPlaceholder(false);
  imagesWrap.innerHTML = '';

  try{
    // Example request body — adapt fields to whichever image API provider you use.
    const body = { prompt, size, n };

    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Do NOT put an Authorization header here if API key would be exposed.
      },
      body: JSON.stringify(body)
    });

    if(!res.ok){
      const t = await res.text();
      throw new Error(`Server error: ${res.status} ${t}`);
    }

    // The expected response shape from your server should be JSON with an array of image URLs
    // or base64 data URIs, for example: { images: ["https://.../img1.png", "data:image/png;base64,..."] }

    const data = await res.json();
    const images = data.images || [];

    if(images.length === 0){
      placeholder.textContent = 'No images were returned. Try a different prompt.';
      showPlaceholder(true);
    } else {
      images.forEach(src => {
        const img = document.createElement('img');
        img.alt = prompt.slice(0,120);
        img.src = src; // src can be a public URL or a data URL (base64)
        imagesWrap.appendChild(img);
      });
    }

  } catch(err){
    console.error(err);
    placeholder.textContent = 'Failed to generate image — ' + (err.message || 'unknown error');
    showPlaceholder(true);
  } finally{
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Image';
  }
}

generateBtn.addEventListener('click', generateImages);

// Optional: support pressing Enter (Ctrl+Enter) inside the textarea to submit
promptEl.addEventListener('keydown', (e) => {
  if((e.key === 'Enter' && e.ctrlKey) || (e.key === 'Enter' && e.metaKey)){
    e.preventDefault();
    generateImages();
  }
});
