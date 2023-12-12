import React, { useState } from 'react';
import S3FileOperations from './components/S3FileOperations';
import AWSCredentialsForm from './components/AWSCredentialsForm';

const App = () => {
  const [showAWSForm, setShowAWSForm] = useState(true);
  const [credentialsSubmitted, setCredentialsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setShowAWSForm(false);
    setCredentialsSubmitted(true);
  };

  return (
    <div className="login-container">
      {showAWSForm && (
        <AWSCredentialsForm onFormSubmit={handleFormSubmit} />
      )}
      {credentialsSubmitted && !showAWSForm && <S3FileOperations />}
    </div>
  );
};

export default App;
