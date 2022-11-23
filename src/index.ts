import express, { urlencoded, json, Application } from 'express';
import routes from './routes';

const server: Application = express();
server.use(json());
server.use(urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

server.use(routes);

server.listen(port, () => {
  console.log(`you Listen to port ${port}`);
});

export default server;
