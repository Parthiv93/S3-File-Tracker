# S3 File Tracker App

Welcome to the S3 File Tracker App! This web application allows users to seamlessly interact with Amazon S3, enabling file uploads and easy management.

## Features

- **AWS Credentials Entry**: Configure your AWS access key, secret key, region, and bucket name effortlessly.

- **File Upload**: Seamlessly upload JSON files to your S3 bucket.

- **View Uploaded Files**: Easily navigate and view the list of files stored in your S3 bucket.

- **View File Data**: Dive deeper by clicking on a file to view its data in a user-friendly line chart.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AWS SDK**: AWS S3 for file storage
- **Styling**: CSS

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js and npm**
- **MongoDB**
- **AWS account with S3 bucket configured**

## Installation

### Clone the Repository

```bash
 git clone https://github.com/Parthiv93/S3-File-Tracker.git
 cd s3-file-tracker
```

## Install Dependencies

```bash
cd frontend/s3-file-upload
npm install
cd ../backend
npm install
```

## Configuration

- **Create a .env file in the backend directory with the following content :**

```bash
MONGODB_URI=your_mongodb_connection_string
```

## Run the Application

- **Start MongoDB Server :**

```bash
mongod
```

- **Start Backend Server :**

```bash
cd backend
npm start
```

- **Start Frontend Server :**

```bash
cd frontend/s3-file-upload/src
npm start
```

- **Open your browser and navigate to http://localhost:3000**

## Usage

- Enter your AWS credentials using the form provided.
- Upload files using the file upload section.
- View uploaded files and their data in the respective sections.
