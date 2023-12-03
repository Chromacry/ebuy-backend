// index.mjs
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: `.env.local`, override: true });

import BaseRoute from "./routes/BaseRoute.mjs";

// Start the server
const app = express();
const port = process.env.SERVER_PORT || 8080;
app.use(express.json({
  limit: '100mb'
}))
app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Define a basic route
app.use("/api", BaseRoute);

