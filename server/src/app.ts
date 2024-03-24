import express, { Application } from 'express';

const EXPRESS_PORT = 3001;

export const app: Application = express();

app.set("port", EXPRESS_PORT);

app.use(express.json());