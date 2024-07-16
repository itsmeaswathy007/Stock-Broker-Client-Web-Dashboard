# Stock Broker Client Web Dashboard

This is a React application for a stock broker client web dashboard where users can subscribe to stock prices and see updates in real-time. The app supports multiple users who can subscribe to different stocks, and their dashboards update asynchronously while both are open.

## Features

- User login
- Subscribe to supported stocks (GOOG, TSLA, AMZN, META, NVDA)
- Real-time stock price updates
- Support for at least 2 users with asynchronous updates

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2.Install the dependencies for the frontend and backend:

```bash

cd stockbroker-dashboard/frontend
npm install
cd ..
npm install

3.Running the Application
  Start the server:

```bash
   node server.js

The server will run on http://localhost:4000

  Start the frontend:

```bash

   cd frontend
   npm start
   The frontend will run on http://localhost:3000.

Usage
----------
Open http://localhost:3000 in your browser.
Enter your email to log in.
Subscribe to one or more supported stocks (GOOG, TSLA, AMZN, META, NVDA).
Open another tab or browser and repeat steps 1-3 to see real-time updates for different users.