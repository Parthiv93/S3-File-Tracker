import React, { useState, useEffect } from 'react';
import axios from 'axios';

const S3FileList = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/files');
      setUploadedFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <div>
      <h2>S3 File List</h2>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default S3FileList;
