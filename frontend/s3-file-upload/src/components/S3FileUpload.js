import React, { useState } from 'react';
import axios from 'axios';

const S3FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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
      } catch (error) {
        console.error('Error uploading file to S3:', error);
      }
    }
  };

  return (
    <div>
      <h2>S3 File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File to S3</button>
    </div>
  );
};

export default S3FileUpload;
