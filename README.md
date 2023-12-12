# S3 File Tracker App

This web application allows users to upload JSON files to Amazon S3 and view the list of uploaded files. It provides a simple interface to enter AWS credentials and perform file operations.

## Features

- **AWS Credentials Entry**: Users can enter their AWS access key, secret key, region, and bucket name to configure the S3 connection.

- **File Upload**: Users can upload JSON files to their configured S3 bucket.

- **View Uploaded Files**: Users can view the list of files uploaded to their S3 bucket.

- **View File Data**: Users can click on a file to view its data in a line chart.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AWS SDK**: AWS S3 for file storage
- **Styling**: CSS

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js and npm
- MongoDB
- AWS account with S3 bucket configured

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Parthiv93/S3-File-Tracker.git

2. Navigate to the project directory:

cd s3-file-tracker

3. Install dependencies for both frontend and backend:

cd frontend/s3-file-upload
npm install
cd ../backend
npm install

## Configuration

1. Create a .env file in the backend directory with the following content:

MONGODB_URI=your_mongodb_connection_string

## Run the Application

1. Start the MongoDB server:

```bash
mongod

2. Start the backend server:

cd backend
npm start

3. Start the frontend server:

cd frontend
npm start

4. Open your browser and navigate to http://localhost:3000.

##Usage

1. Enter your AWS credentials using the form provided.
2. Upload files using the file upload section.
3. View uploaded files and their data in the respective sections.



