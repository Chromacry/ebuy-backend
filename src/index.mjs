// index.mjs
import express from 'express';
import dotenv from 'dotenv';
import DBConfig from './routes/DBConfig.mjs';

dotenv.config({ path: `.env.local`, override: true });


const app = express();
const port = process.env.SERVER_PORT || 8080;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express with ECMAScript modules!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


