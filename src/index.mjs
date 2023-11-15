// index.mjs
import express from 'express';

const app = express();
const port = 3000;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express with ECMAScript modules!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
