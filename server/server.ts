import * as express from 'express';
import { join } from 'path';
import { getForecast, index } from './routes';

const port = process.env.PORT || '3000';

const app = express();
app.use(express.static(join(__dirname, 'static')));

// Routes
app.get('/', index);
app.get('/api/forecast', getForecast);

app.listen(port, () => console.log(`Listening on port ${port}.`));
