import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config"
import "dotenv-expand/config"

import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";

const app = express();

// Middleware
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api', authRouter);
app.use('/api/notes', notesRouter);

// Connect to database
mongoose
  .connect(process.env.DB_URI ?? "")
  .then(() => {
    console.log("Connected with MongoDB");

    // Listen for requests once connection with db is established
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
