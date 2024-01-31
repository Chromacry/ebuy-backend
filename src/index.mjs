// index.mjs
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: `.env.local`, override: true });

import BaseRoute from "./routes/BaseRoute.mjs";
import expressStatusMonitor from "express-status-monitor";
import { logger } from "./utils/LoggingUtil.mjs";

// Start the server
const app = express();
const port = process.env.SERVER_PORT || 8080;
app.use(express.json({
  limit: '100mb'
}))
app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(expressStatusMonitor());

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
  logger.info(`Server is running on http://0.0.0.0:${port}!`); 
});

// Define a basic route
app.use("/api", BaseRoute);


