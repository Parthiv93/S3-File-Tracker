import React, { useState } from 'react';
import axios from 'axios';

const S3FileView = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleViewFile = async () => {
    if (selectedFile) {
      try {
        const response = await axios.get(`http://localhost:3001/api/view/${selectedFile.name}`);
        setFileData(response.data);
      } catch (error) {
        console.error('Error fetching file data:', error);
      }
    }
  };

  return (
    <div>
      <h2>S3 File View</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleViewFile}>View File Data</button>

      {fileData && (
        <div>
          <h3>File Data</h3>
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default S3FileView;
