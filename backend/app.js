require('dotenv').config();

const express = require('express');
const multer = require('multer');
const { S3 } = require('aws-sdk');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// MongoDB model for storing AWS S3 credentials
const AWSCredentials = mongoose.model('AWSCredentials', {
  accessKeyId: String,
  secretAccessKey: String,
  region: String,
  bucketName: String,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).any(); // Modify this line to accept any type of file

const fileSchema = new mongoose.Schema({
  filename: String,
  s3Url: String,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

// Route to save AWS S3 credentials to the database
app.post('/api/aws-credentials', async (req, res) => {
  console.log('Received AWS Credentials:', req.body);
  const { accessKeyId, secretAccessKey, region, bucketName } = req.body;

  try {
    await AWSCredentials.create({
      accessKeyId,
      secretAccessKey,
      region,
      bucketName,
    });

    res.json({ message: 'AWS S3 credentials saved successfully' });
  } catch (error) {
    console.error('Error saving AWS S3 credentials to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const retrieveAWSCredentials = async () => {
  try {
    const credentials = await AWSCredentials.findOne();
    return credentials;
  } catch (error) {
    console.error('Error retrieving AWS S3 credentials from MongoDB:', error);
    return null;
  }
};

const configureS3 = async () => {
  const credentials = await retrieveAWSCredentials();

  if (credentials) {
    return new S3({
      region: credentials.region,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    });
  }

  return null;
};

app.post('/api/upload', upload, async (req, res) => {
  const uploadedFile = req.files[0];
  const fileName = req.body.fileName; // Retrieve fileName from the request body
  const fileContent = uploadedFile.buffer.toString('utf-8'); // Convert buffer to string

  try {
    const s3 = await configureS3();

    if (!s3) {
      return res.status(500).json({ error: 'AWS S3 credentials not configured' });
    }

    const credentials = await retrieveAWSCredentials();
    const s3BucketName = credentials.bucketName;

    const params = {
      Bucket: s3BucketName,
      Key: fileName,
      Body: Buffer.from(fileContent, 'utf-8'),
    };

    const s3UploadResponse = await s3.upload(params).promise();

    await File.create({
      filename: fileName,
      s3Url: s3UploadResponse.Location,
    });

    console.log('File metadata saved to MongoDB successfully');

    res.json({ message: 'File uploaded to S3 and metadata saved to MongoDB successfully' });
  } catch (error) {
    console.error('Error uploading file to S3 or saving metadata to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/check-aws-credentials', async (req, res) => {
  try {
    const credentials = await retrieveAWSCredentials();
    res.json({ hasCredentials: !!credentials });
  } catch (error) {
    console.error('Error checking AWS credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/aws-credentials', async (req, res) => {
  try {
    const credentials = await retrieveAWSCredentials();
    res.json(credentials);
  } catch (error) {
    console.error('Error retrieving AWS S3 credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/files', async (req, res) => {
  try {
    const s3 = await configureS3();

    if (!s3) {
      return res.status(500).json({ error: 'AWS S3 credentials not configured' });
    }

    const credentials = await retrieveAWSCredentials();
    const s3BucketName = credentials.bucketName;

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
    const s3 = await configureS3();

    if (!s3) {
      return res.status(500).json({ error: 'AWS S3 credentials not configured' });
    }

    const credentials = await retrieveAWSCredentials();
    const s3BucketName = credentials.bucketName;

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
