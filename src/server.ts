import 'express-async-errors';
import express from 'express';
import 'dotenv/config';
import { erros } from './middlewares/errors';
import { router } from './router';

const PORT = process.env.APP_PORT || 3333;

const app = express();

app.use(express.json());

app.use(router);

app.use(erros);

app.listen(PORT, () => {
  console.log(
    `server is running on the port ${PORT}\n${process.env.APP_HOST}:${PORT}\npress quit it CONTROL + C`
  );
});
