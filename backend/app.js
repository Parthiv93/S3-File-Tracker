require('dotenv').config();

const express = require('express');
const multer = require('multer');
const { S3 } = require('aws-sdk');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileSchema = new mongoose.Schema({
    filename: String,
    s3Url: String,
    uploadDate: { type: Date, default: Date.now },
  }); 
const File = mongoose.model('File', fileSchema);

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3BucketName = 'myfileuploads';

app.post('/api/upload', upload.single('file'), async (req, res) => {
    const uploadedFile = req.file;
  
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const params = {
        Bucket: s3BucketName,
        Key: uploadedFile.originalname,
        Body: uploadedFile.buffer,
      };
  
      const s3UploadResponse = await s3.upload(params).promise();
  
      await File.create({
        filename: uploadedFile.originalname,
        s3Url: s3UploadResponse.Location,
      });
  
      console.log('File metadata saved to MongoDB successfully');
  
      res.json({ message: 'File uploaded to S3 and metadata saved to MongoDB successfully' });
    } catch (error) {
      console.error('Error uploading file to S3 or saving metadata to MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      mongoose.connection.close();
    }
  });

app.get('/api/files', async (req, res) => {
  try {
    const data = await s3.listObjectsV2({ Bucket: s3BucketName }).promise();
    const files = data.Contents.map((file) => file.Key);
    res.json({ files });
  } catch (error) {
    console.error('Error fetching files from S3:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/view/:fileName', async (req, res) => {
  const fileName = req.params.fileName;

  try {
    const data = await s3.getObject({ Bucket: s3BucketName, Key: fileName }).promise();
    const fileContent = data.Body.toString('utf-8');
    const jsonData = JSON.parse(fileContent);

    res.json(jsonData);
  } catch (error) {
    console.error('Error fetching file data from S3:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
