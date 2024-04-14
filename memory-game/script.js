document.addEventListener("DOMContentLoaded", function() {
  const imageUrlInput = document.getElementById("imageUrlInput");
  const topTextInput = document.getElementById("topTextInput");
  const bottomTextInput = document.getElementById("bottomTextInput");
  const fontSizeInput = document.getElementById("fontSizeInput");
  const generateButton = document.getElementById("generateButton");
  const generateAdditionalButton = document.getElementById("generateAdditionalButton");
  const resetButton = document.getElementById("resetButton");
  const downloadButton = document.getElementById("downloadButton");
  let memeCounter = 0; // To keep track of the number of memes generated

  generateButton.addEventListener("click", function() {
      const memeCanvas = document.getElementById("memeCanvas");
      drawMeme(memeCanvas);
  });

  generateAdditionalButton.addEventListener("click", function() {
      memeCounter++;
      const newCanvas = document.createElement("canvas");
      newCanvas.classList.add("memeCanvas");
      newCanvas.id = "memeCanvas_" + memeCounter; // Give a unique ID to each canvas
      document.querySelector(".meme-generator").appendChild(newCanvas); // Append the new canvas after the existing canvases

      const memeCanvas = document.getElementById("memeCanvas_" + memeCounter); // Get the reference to the new canvas
      drawMeme(memeCanvas);
  });

  resetButton.addEventListener("click", function() {
      imageUrlInput.value = "";
      topTextInput.value = "";
      bottomTextInput.value = "";
      fontSizeInput.value = "36";
      const memeCanvases = document.querySelectorAll(".memeCanvas");
      memeCanvases.forEach(canvas => canvas.parentNode.removeChild(canvas)); // Remove all meme canvases
  });

  downloadButton.addEventListener("click", function() {
      const memeCanvases = document.querySelectorAll(".memeCanvas");
      memeCanvases.forEach(canvas => {
          const dataUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "meme_" + canvas.id + ".png"; // Use canvas ID in the file name
          a.click();
      });
  });

  function drawMeme(canvas) {
      const imageUrl = imageUrlInput.value;
      const topText = topTextInput.value;
      const bottomText = bottomTextInput.value;
      const fontSize = fontSizeInput.value;

      if (imageUrl.trim() === "") {
          alert("Please enter an image URL.");
          return;
      }

      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = function() {
          canvas.width = image.width;
          canvas.height = image.height;

          const ctx = canvas.getContext("2d");

          ctx.drawImage(image, 0, 0);

          // Text settings
          ctx.fillStyle = "white";
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.textAlign = "center";
          ctx.font = `${fontSize}px Impact`;

          // Calculate bottom text position relative to image height
          const bottomTextY = canvas.height - 20 - parseInt(fontSize);

          // Top text
          ctx.fillText(topText, canvas.width / 2, parseInt(fontSize));
          ctx.strokeText(topText, canvas.width / 2, parseInt(fontSize));

          // Bottom text
          ctx.fillText(bottomText, canvas.width / 2, bottomTextY);
          ctx.strokeText(bottomText, canvas.width / 2, bottomTextY);
      };

      image.onerror = function() {
          alert("Failed to load image. Please check the URL.");
      };

      image.src = imageUrl;
  }
});