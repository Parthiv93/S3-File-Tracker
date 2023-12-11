import React, { useState } from 'react';

const AWSCredentialsForm = ({ setAWSCredentials, onFormSubmit }) => {
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [region, setRegion] = useState('');
  const [bucketName, setBucketName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/aws-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessKeyId, secretAccessKey, region, bucketName }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('AWS Credentials submitted successfully:', responseData);
        setAWSCredentials({ accessKeyId, secretAccessKey, region, bucketName });
      } else {
        console.error('Failed to submit AWS credentials:', responseData);
      }
    } catch (error) {
      console.error('Error submitting AWS credentials:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Access Key ID:
        <input type="text" value={accessKeyId} onChange={(e) => setAccessKeyId(e.target.value)} />
      </label>
      <br />
      <label>
        Secret Access Key:
        <input
          type="text"
          value={secretAccessKey}
          onChange={(e) => setSecretAccessKey(e.target.value)}
        />
      </label>
      <br />
      <label>
        Region:
        <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
      </label>
      <br />
      <label>
        Bucket Name:
        <input type="text" value={bucketName} onChange={(e) => setBucketName(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
export default AWSCredentialsForm;