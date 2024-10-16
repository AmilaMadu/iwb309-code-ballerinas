## License and Usage

All rights reserved. 
This project and its source code are the intellectual property of Team Code Ballerinas. No part of this code may be copied, modified, distributed, or used in any form without the explicit permission of the authors. For inquiries regarding usage, please contact us for permission.

# Website Setup Instructions

This guide will help you set up the website locally, which consists of a frontend (React + Vite) and a backend (Ballerina with MySQL database).

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **Ballerina** (version `2201.10.0`) - [Download Ballerina](https://ballerina.io/)
- **MySQL** (for the database) - [Download MySQL](https://dev.mysql.com/downloads/installer/
)

## Database Setup
1. Ensure you have MySQL installed and running. Connect to the local instance.
2. Clone the repository to your local machine using using 
```bash
    https://github.com/AmilaMadu/iwb309-code-ballerinas.git
```
3. Update the MySQL connection configuration in Config.toml file. 
4. Create a new databse for the project named doctor_appointment_system.
```bash
CREATE DATABASE doctor_appointment_system;
```
5. Run the init-data.sql script.

## Backend Setup (Ballerina) 
1. Navigate to the backend directory:
```bash
    cd backend
```
2. Install the necessary Ballerina dependencies. 
```bash
    bal dist pull
```
3. Run the Ballerina service:
```bash
    bal run
```
This will start the backend service, and it should connect to the MySQL database.

## Frontend Setup (React + Vite)
1. Navigate to the frontend directory.
```bash
    cd frontend
``` 
2. Install the required dependencies for the frontend. 
```bash
    npm install
``` 
3. Start the server.
```bash
    npm run dev
``` 

The frontend will start on the local development server http://localhost:5173/ 

Now both the backend and frontend should be running locally.
