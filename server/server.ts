import * as express from 'express';
import { join } from 'path';
import { index } from './routes';

const port = process.env.PORT || '3000';

const app = express();
app.use(express.static(join(__dirname, 'static')));

app.get('/', index);

app.listen(port, () => console.log('Listening on port 3000'));
