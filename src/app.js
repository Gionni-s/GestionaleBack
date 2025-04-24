import mongoose from './services/mongoose';
import express from 'express';
import http from 'http';
import api from './api';
import { mongo } from './config';
import { createAgenda } from './services/agenda';
import * as scheduler from './services/scheduler';

const app = express(api);

const server = http.createServer(app);

setImmediate(async () => {
  createAgenda();
  if (mongo.createMongo) {
    await mongoose.connect(mongo.uri, {});
  } else {
    logger.info('\x1B[0;34mMongoose:\x1B[0m DB disabled');
  }

  scheduler.start();
});

export default app;