# Sportlife

## Description

**Sportlife** is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. It demonstrates my ability to develop and deploy both the frontend and backend of a complete project.

This project contains two main folders:

- **client**: The frontend, developed using React.
- **server**: The backend, developed using Node.js and Express.

Both frontend and backend have been deployed:

- [Frontend](https://social-app-client-ssb1.onrender.com)
- [Backend](https://social-app-server-at5g.onrender.com)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Implemented Features](#list-of-implemented-features)
- [Planned Features](#list-of-planned-features)
- [Known Bugs](#list-of-known-bugs)

## Installation

To run the application locally, follow these steps:

1. Install **Node.js** and **npm** on your machine.
2. Clone the repository to your local system.
3. In the root directory, create a `.env` file.
4. Set up a MongoDB server and retrieve the MongoDB URI.
5. Add the following environment variables:

### In the Server Folder:

- `MONGO_URL=<your_mongodb_url>`
- `PORT=5000`
- `JWT_SECRET=<your_secret_key>`
- `REACT_APP_CLIENT=<your_client_url>`

### In the Client Folder:

- `REACT_APP_SERVER=<your_server_url>`

## Usage

To run the application:

1. Start the backend server from the root directory:

   ```bash
   cd server
   npm start
   ```

The terminal will indicate the server port, for example:

```bash
Server Port: 3001
```

Ensure the `.env` file in the client folder is updated with the server URL:

- `REACT_APP_SERVER=<your_server_url>`

2. Open a new terminal to start the frontend:

   ```bash
   cd client
   npm start
   ```

3. The application will run on `http://localhost:3000`.

Ensure the `.env` file in the client folder includes:

- `REACT_APP_CLIENT=<your_client_url>`

4. The following default admin user is created:

   - **Email:** tuan.mn51@gmail.com
   - **Password:** 1234

## List of Implemented Features

- User registration and login
- Unique avatar generation for each user
- Unique email ID validation during registration
- Dark/light mode toggle
- Posting and anonymous commenting on posts
- Messaging between users
- User profile page access

## List of Planned Features

- Google OAuth for user authentication
- Notification settings
- Migrate backend to AWS services for scalability

## List of Known Bugs

- New users cannot upload profile pictures from their local machine (missing avatar images)
- Missing error page for incorrect login attempts
