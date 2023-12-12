import React, { useState } from 'react';
import '../styles/AWSForm.css';

const AWSCredentialsForm = ({ onFormSubmit }) => {
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [region, setRegion] = useState('');
  const [bucketName, setBucketName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/aws-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessKeyId, secretAccessKey, region, bucketName }),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log('AWS Credentials submitted successfully:', responseData);
        onFormSubmit(); 
      } else {
        console.error('Failed to submit AWS credentials:', responseData);
      }
    } catch (error) {
      console.error('Error submitting AWS credentials:', error);
    }
  };

  return (
    <div className="AWSCredentialsForm">
      <h2>Enter AWS Credentials</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Access Key ID:
          <input type="text" value={accessKeyId} onChange={(e) => setAccessKeyId(e.target.value)} />
        </label>
        <label>
          Secret Access Key:
          <input
            type="text"
            value={secretAccessKey}
            onChange={(e) => setSecretAccessKey(e.target.value)}
          />
        </label>
        <label>
          Region:
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
        </label>
        <label>
          Bucket Name:
          <input type="text" value={bucketName} onChange={(e) => setBucketName(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AWSCredentialsForm;
