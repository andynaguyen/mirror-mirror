import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { join } from 'path';
import schema from './graphql/schema';
import { getForecast, getTraffic, index } from './routes';

const port = process.env.PORT || '3000';

const app = express();
app.use(express.static(join(__dirname, 'static')));

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  }),
);
// Routes
app.get('/', index);
app.get('/api/forecast', getForecast);
app.get('/api/traffic', getTraffic);

app.listen(port, () => console.log(`Listening on port ${port}.`));
