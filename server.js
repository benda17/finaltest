const express = require('express');
const bodyParser = require('body-parser');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Parse the service account key from the environment variable
const key = JSON.parse(process.env.GOOGLE_CLOUD_KEY);
const client = new textToSpeech.TextToSpeechClient({ credentials: key });

// Endpoint for synthesizing speech
app.post('/api/synthesize', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send('Text is required');
  }

  const request = {
    input: { text },
    voice: { languageCode: 'he-IL', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const filename = `audio-${Date.now()}.mp3`;
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`./public/audio/${filename}`, response.audioContent, 'binary');
    res.json({ audioUrl: `/audio/${filename}` });
  } catch (err) {
    console.error('Error synthesizing speech:', err);
    res.status(500).send('Error synthesizing speech');
  }
});

// Serve static files and index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
