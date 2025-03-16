const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); // Serve uploaded files

// Ensure the uploads folder exists
fs.mkdirSync('uploads', { recursive: true });

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mern_ml_integration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully!'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// Multer Setup for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload Route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '❌ No file uploaded' });
  }

  console.log(`📂 File received: ${req.file.path}`);

  // Call the Python script for model prediction
  const pythonProcess = spawn('python', ['predict.py', req.file.path]); // Fixed the script name

  let resultData = '';

  pythonProcess.stdout.on('data', (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`❌ Python Error: ${data}`);
    return res.status(500).json({ message: 'Error in prediction script', error: data.toString() });
  });

  pythonProcess.on('close', (code) => {
    console.log(`🔄 Python process exited with code ${code}`);
    if (code !== 0) {
      return res.status(500).json({ message: 'Python script failed' });
    }

    try {
      const predictions = JSON.parse(resultData);
      res.json({ message: '✅ File processed successfully', predictions });
    } catch (error) {
      console.error('❌ JSON Parsing Error:', error);
      res.status(500).json({ message: 'Invalid JSON response from Python script' });
    }
  });
});

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
