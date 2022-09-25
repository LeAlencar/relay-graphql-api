import { connectDB }from './database/database';
import dotenv from "dotenv";
import { createServer } from "http";
import app from './app';
import { execute, subscribe } from 'graphql';
import { schema } from "./schema/schema";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

(async () => {
  dotenv.config();
  try {
    connectDB();
  } catch (error) {
    console.error("Unable to connect to database");
    process.exit(1);
  }

  const server = createServer(app.callback());

  server.listen(process.env.PORT, () => {
    console.log('Server running 🚀')
    const wsServer = new WebSocketServer({
      server,
      path: '/graphql',
    });

    useServer({ schema, execute, subscribe }, wsServer);

  });



})();
