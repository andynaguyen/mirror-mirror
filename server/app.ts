import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { join } from 'path';
import schema from './graphql/schema';
import { index } from './routes';

const port = process.env.PORT || '3000';
const app = express();

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

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
