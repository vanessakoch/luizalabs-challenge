import "reflect-metadata";
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { routes } from './routes';
import swaggerFile from './swagger.json';
import mongoose from 'mongoose';

import './shared/container';

const app = express();

mongoose.connect("mongodb+srv://admin:magalu@magaludb.g6gha.mongodb.net/magaludb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(routes);

app.listen(3333);