async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const apiKey = "YOUR_API_KEY"; // Replace with your API key

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: "512x512",
    }),
  });

  const data = await response.json();
  const imageUrl = data.data[0].url;
  document.getElementById("imageResult").innerHTML = `<img src="${imageUrl}" alt="Generated Image" />`;
}
