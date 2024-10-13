const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const customerRoutes = require('./routes/customerRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Enable CORS for requests from your frontend
app.use(cors({
  origin: 'http://localhost:9000',  // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the methods your frontend needs
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  preflightContinue: false, // Handle preflight requests automatically
  optionsSuccessStatus: 204 // For older browsers
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define your routes
app.use('/api/customers', customerRoutes);
app.use('/api/projects', projectRoutes);

// Set the port, defaulting to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
