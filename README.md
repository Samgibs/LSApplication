Project Structure
API: Backend built with Node.js, Express, Sequelize (for MySQL), provides RESTful endpoints for customers and projects.
Frontend: Built with Vue.js and Quasar for a responsive Single Page Application (SPA).
Requirements
Node.js v18+
MySQL
Setup Instructions
Backend (API)
Install Dependencies: Navigate to the API directory and install the required packages:

bash
Copy code
cd API
npm install
Set Up Database: Ensure MySQL is running and configured. Set up the database using Sequelize migrations:

bash
Copy code
npx sequelize-cli db:migrate
Start the Server: Run the backend server:

bash
Copy code
node app.js
The server should run on http://localhost:3000.

Frontend (Vue + Quasar)
Install Dependencies: Navigate to the frontend directory and install the required packages:

bash
Copy code
cd frontend
npm install
Run the Frontend: Start the Quasar development server:

bash
Copy code
quasar dev
The frontend should run on http://localhost:9000.

API Endpoints
Customers:

GET /api/customers: Retrieve all customers
POST /api/customers: Add a new customer
PUT /api/customers/:id: Update a customer
DELETE /api/customers/:id: Delete a customer
Projects:

GET /api/projects: Retrieve all projects
POST /api/projects: Add a new project
PUT /api/projects/:id: Update a project
DELETE /api/projects/:id: Delete a project
CORS
CORS is enabled to allow requests from http://localhost:9000 to the backend API at http://localhost:3000.
