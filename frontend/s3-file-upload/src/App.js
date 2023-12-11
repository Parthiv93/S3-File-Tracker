import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
    <div className="container mt-3">
      {showAWSForm && (
        <AWSCredentialsForm onFormSubmit={handleFormSubmit} />
      )}
      {credentialsSubmitted && !showAWSForm && <S3FileOperations />}
    </div>
  );
};

export default App;
