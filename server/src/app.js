const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const imageUpload = multer({
  dest: path.join(__dirname, './images'),
});

const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

const dbImages = [];

app.post('/image', imageUpload.single('image'), (req, res) => {
  const { filename, mimetype } = req.file;
  dbImages.push({ type: mimetype, filename });

  res.json({ uri: `http://localhost:3500/image/${filename}` });
});

app.get('/image/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const { type } = dbImages.filter((img) => img.filename === filename)[0];

    res.type(type).sendFile(path.join(__dirname, `./images/${filename}`));
  } catch (error) {
    res.sendStatus(400);
  }
});

app.use('*', (req, res) => res.sendStatus(400));

app.listen(PORT, () => console.log('listening on port: ', PORT));
