import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(bodyParser.json());

// Routes
app.use(userRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Profiler ready to use",
    status: "SUCCESS",
  });
});

// Error Handling Middleware
app.use(errorHandler);

export default app;
