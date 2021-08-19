import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import * as dotenv from "dotenv";

import { routes } from './routes';
import { AppError } from './shared/errors/AppError';
import swaggerFile from './swagger.json';
import mongoose from 'mongoose';

import './shared/container';

dotenv.config();
const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER!}:${process.env.DB_PASSWORD}@${process.env.DB_NAME!}.g6gha.mongodb.net/${process.env.DB_NAME!}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);

// Middleware para tratar erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error ${err.message}`
  })
})

app.listen(3333);