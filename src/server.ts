import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

const server = express();

server.use(cors());
server.use(json());

server.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}...`);
});
