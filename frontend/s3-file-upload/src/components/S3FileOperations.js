import React, { useState, useEffect } from 'react';
import axios from 'axios';

const S3FileOperations = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        await axios.post('http://localhost:3001/api/upload', formData);

        console.log('File uploaded to S3 successfully');
        // Fetch updated list of files after upload
        fetchUploadedFiles();
      } catch (error) {
        console.error('Error uploading file to S3:', error);
      }
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/files');
      setUploadedFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    }
  };

  const handleViewFile = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/view/${fileName}`);
      setFileData(response.data);
    } catch (error) {
      console.error('Error fetching file data:', error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <div>
      <h2>S3 File Operations</h2>

      <div>
        <h3>Upload JSON File to S3</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>

      <div>
        <h3>View Uploaded Files in S3</h3>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file}>
              {file} <button onClick={() => handleViewFile(file)}>View</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>View File Data in Line Chart</h3>
        {fileData && (
          <div>
            <p>File Data: {JSON.stringify(fileData)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default S3FileOperations;
