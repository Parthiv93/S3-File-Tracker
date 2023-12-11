import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import S3FileOperations from './components/S3FileOperations';
import AWSCredentialsForm from './components/AWSCredentialsForm';

const App = () => {
  const [showAWSForm, setShowAWSForm] = useState(false);

  useEffect(() => {
    // Check if AWS credentials exist
    const checkAWSCredentials = async () => {
      try {
        const response = await fetch('/api/check-aws-credentials');
        const data = await response.json();

        if (!data.hasCredentials) {
          // Show the form if credentials don't exist
          setShowAWSForm(true);
        }
      } catch (error) {
        console.error('Error checking AWS credentials:', error);
      }
    };

    checkAWSCredentials();
  }, []); // Run once on component mount

  return (
    <div className="container mt-3">
      {showAWSForm && (
        <AWSCredentialsForm
        setAWSCredentials={setAWSCredentials}
        onFormSubmit={() => setShowAWSForm(false)}
      />
      
      )}
      <S3FileOperations />
    </div>
  );
};

export default App;
