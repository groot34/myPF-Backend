const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'https://theatharva.me',
    'https://www.theatharva.me',
    'https://atharvx.vercel.app'
  ], 
  methods: ['GET', 'POST', 'OPTIONS'],
  //allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Add body parsing middleware
app.use(express.json());

// Preflight request handler
// app.options('*', cors(corsOptions));

// Import the send-email route handler
const sendEmailHandler = require('./api/send-email');

// Set up the route for sending emails
app.post('/send-email', sendEmailHandler);

// Simple route to test the server
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});