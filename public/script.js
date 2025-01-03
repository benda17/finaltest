<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Learn Hebrew Words</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Poppins:wght@400;600&display=swap">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      background: linear-gradient(135deg, #ffb3c1, #ff8fa3);
      color: #444;
    }
    .container {
      text-align: center;
      padding: 20px;
    }
    h1 {
      font-family: 'Caveat', cursive;
      color: #ff4081;
      text-shadow: 1px 1px 4px #ffc0cb;
      font-size: 2.5rem;
    }
    .cards {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
    }
    .card {
      background: #fffafc;
      border: 2px solid #ffb3c1;
      border-radius: 15px;
      padding: 10px;
      width: 150px;
      height: 260px;
      text-align: center;
      box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: scale(1.05);
    }
    .card img {
      width: 100px;
      height: 100px;
      margin-bottom: 10px;
      border-radius: 10px;
    }
    .card button {
      background: #ff80ab;
      border: none;
      border-radius: 10px;
      padding: 5px 10px;
      cursor: pointer;
      color: white;
      font-weight: bold;
      margin-top: 10px;
    }
    .card button:hover {
      background: #ff4081;
    }
    a {
      display: block;
      margin-top: 30px;
      text-decoration: none;
      color: #ff4081;
      font-size: 1.2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🖼️ Learn Hebrew Words</h1>
    <div class="cards" id="words-container"></div>
    <a href="index.html" style="display: block; margin-top: 30px; text-decoration: none; color: #ff4081;">🔙 Back to Home</a>
  </div>

  <script>
    const words = [
      { hebrew: "אבא", english: "Father", sound: "אבא" },
      { hebrew: "אמא", english: "Mother", sound: "אמא" },
      { hebrew: "תפוח", english: "Apple", sound: "תפוח" },
      { hebrew: "ספר", english: "Book", sound: "ספר" },
    ];

    const loadWords = () => {
      const container = document.getElementById("words-container");
      words.forEach(({ hebrew, english, sound }) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <p><strong>${hebrew}</strong></p>
          <p>${english}</p>
          <button onclick="playSound('${sound}')">🔊 Hear</button>
        `;
        container.appendChild(card);
      });
    };

    const playSound = (text) => {
      console.log(`Attempting to play sound for: ${text}`);
      fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch audio');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Audio URL:', data.audioUrl);
          const audio = new Audio(data.audioUrl);
          audio.play();
        })
        .catch((error) => {
          console.error('Error playing sound:', error);
          alert('Failed to play sound. Please check your setup.');
        });
    };

    document.addEventListener("DOMContentLoaded", loadWords);
  </script>
</body>
</html>
