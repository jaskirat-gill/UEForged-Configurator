// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS options
const corsOptions = {
    origin: process.env.CORS_ORIGINS || 'http://localhost:5173',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));

// Serve static files from the "public" directory
const staticDirectory = path.join(__dirname, 'files');
app.use(express.static(staticDirectory));

// Handle 404 for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
