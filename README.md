# Financial Data Management App

A MERN stack application for managing financial data, powered by Docker.

## Table of Contents
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Configuring Environment Variables](#configuring-environment-variables)
  - [Running the Application](#running-the-application)
  - [Stopping the Application](#stopping-the-application)
- [Usage Examples](#usage-examples)
  - [Accessing the Frontend](#accessing-the-frontend)
  - [Testing the Backend API with Postman](#testing-the-backend-api-with-postman)

---

## Setup Instructions

### Prerequisites

Ensure the following tools are installed:
1. **Docker Desktop** for Windows ([Download Here](https://docs.docker.com/desktop/windows/)).
2. **Git** for cloning the repository ([Download Here](https://git-scm.com/downloads)).
3. **Node.js (Optional)** if running locally ([Download Here](https://nodejs.org/)).
4. **MongoDB (Required)** if running locally ([Download Here](https://www.mongodb.com/try/download/community)).

### Cloning the Repository

Open a terminal (e.g., Command Prompt, PowerShell, or Git Bash) and run:

    git clone https://github.com/Basavaraj-ID/Financial-Data-Management-And-Analysis.git
    cd Financial-Data-Management-And-Analysis

## Configuring Environment Variables

You need to configure environment variables for both the backend (API) and frontend (Client). Edit the `.env` files in the following directories:

- Backend `.env`: `./server/.env`
- Frontend `.env`: `./client/.env`

### Backend (.env)

Add the following variables to your `./server/.env` file:

    MONGO_URL=mongodb+srv://Basava123:Basava123@cluster0.okusq.mongodb.net/financial_data_management_and_analysis?retryWrites=true&w=majority&appName=Cluster0
    PORT=5001


### Frontend (.env)

Add the following variable to your ./client/.env file:

    VITE_API_URL=http://localhost:5001/

## Running the Application

To run the application, you can use Docker Compose to build and start both the backend and frontend services.

1. Navigate to the project root directory.
2. Run the following command to build and start the services:
   ```plaintext
   docker-compose up --build
This will:

- Build the Docker images for both the backend and frontend.
- Start the backend API on port `5001` and the frontend React app on port `5173`.

Once the services are up and running, the application should be available at:

- **API**: [http://localhost:5001](http://localhost:5001)
- **Frontend**: [http://localhost:5173](http://localhost:5173)

## Stopping the Application

To stop the application, run the following command in the project root directory:

    docker-compose down

This will stop all running containers without removing the volumes.

If you also want to remove the volumes and data, use:
    
    docker-compose down -v

## Usage Examples

Once the application is up and running, you can access the following:

### Accessing the Frontend
Open your browser and navigate to the following URL:
- **Frontend**: [http://localhost:5173](http://localhost:5173)

From the frontend, you can:
- View financial transactions.
- Interact with features like filtering, sorting and searching.

## Testing the Backend API with Postman
The backend API can be accessed at:
- **API**: [http://localhost:5001](http://localhost:5001)

You can use tools like Postman or any REST client to test the API. Example endpoints include:
- `GET /client/transactions`: Fetch all transactions.
  
## Testing the API with Postman
1. **Start Postman** and create a new request.
2. **API Base URL**: `http://localhost:5001/`.
3. Example requests:
   - **GET Request**:
     - URL: `http://localhost:5001/client/transactions`
     - Fetches all transactions.
     - Set the `Content-Type` header to `application/json`.

### Application Interaction
- **Frontend**:
  - View financial data through an interactive UI.
- **Backend**:
  - Process API requests for transaction data.
  - Integrate with a MongoDB database for data storage.
