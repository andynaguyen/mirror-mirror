import * as express from 'express';
import { createServer } from 'http';
import * as graphqlHTTP from 'express-graphql';
import * as SocketIO from 'socket.io';
import { join } from 'path';
import schema from './graphql/schema';
import { index } from './routes';
import handleConnection from './socket';

const port = process.env.PORT || '3000';
const app = express();

// Set static directory
const staticPath = join(__dirname, '../static');
app.use(express.static(staticPath));

// GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  }),
);

// Routes
app.get('/', index(staticPath));

// Create server
const server = createServer(app);

// SocketIO
const io = SocketIO(server);
io.on('connection', handleConnection);

// Start server
server.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
