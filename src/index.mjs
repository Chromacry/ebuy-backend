// index.mjs
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: `.env.local`, override: true });
import BaseRoute from "./routes/BaseRoute.mjs";
import expressStatusMonitor from "express-status-monitor";
import promclient from 'prom-client'
import morgan from 'morgan';

import { logger } from "./utils/LoggingUtil.mjs";

// Start the server
const app = express();
const port = process.env.SERVER_PORT || 8080;

class MyStream {
  write(text) {
      logger.http(text.replace(/\n$/, ''));
  }
}

app.use(express.json({
  limit: '100mb'
}))

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(expressStatusMonitor());

let myStream = new MyStream()
app.use(morgan('tiny', { stream: myStream }))



const collectDefaultMetrics = promclient.collectDefaultMetrics
collectDefaultMetrics({ timeout: 1000 })
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promclient.register.contentType);
    res.send(await promclient.register.metrics());
} catch (error) {
    console.error('Error in /metrics endpoint:', error);
    res.status(500).send('Internal Server Error');
}
})

app.listen(port,'0.0.0.0', () => {
  // console.log(`Server is running on http://0.0.0.0:${port}`);
  logger.info(`Server is running on http://0.0.0.0:${port}!`); 
});

// Define a basic route
app.use("/api", BaseRoute);


