async function generateImage() {
    const prompt = document.getElementById("prompt").value;
    const loading = document.getElementById("loading");
    const outputImg = document.getElementById("output");

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    loading.style.display = "block";
    outputImg.style.display = "none";

    const response = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Api-Key": "c8af263e-cdfd-419a-be82-73afbe57a5dc"

        },
        body: "text=" + encodeURIComponent(prompt)
    });

    const data = await response.json();
    console.log(data); // Debug ke liye
    loading.style.display = "none";
    outputImg.src = data.output_url;
    outputImg.style.display = "block";
}
