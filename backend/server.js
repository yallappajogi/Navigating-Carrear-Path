const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Set up storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// 📦 POST /api/upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '❌ No file uploaded' });
  }

  console.log(`📂 File received: ${req.file.path}`);

  const pythonProcess = spawn('python', ['predict.py', req.file.path]);

  let resultData = '';
  let errorData = '';

  pythonProcess.stdout.on('data', (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  pythonProcess.on('close', (code) => {
    console.log(`🔄 Python process exited with code ${code}`);

    if (code !== 0) {
      console.error('❌ Python script error output:', errorData);
      return res.status(500).json({
        message: '❌ Python script failed',
        error: errorData
      });
    }

    try {
      const predictions = JSON.parse(resultData);
      res.json({
        message: '✅ File processed successfully',
        predictions
      });
    } catch (error) {
      console.error('❌ JSON Parsing Error:', error);
      res.status(500).json({
        message: '❌ Invalid JSON response from Python script',
        raw: resultData,
        error: error.toString()
      });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
