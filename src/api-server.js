import express from 'express';
import {setupRedis, clientRedis} from './redis-client';

const app = express();
const port = process.env.PORT || 4000;

setupRedis();

app.get('/', (req, res) => {
  res.send('Hello React Class, from Express.js!');
});

app.get('/inc-test', (req, res) => {
  clientRedis.incr('inc-test', (err, result) => {
    if (err) {
      console.log(err);
      res.send('Error with Redis');
    }
    else {
      res.send(`New value: ${result}`);
    }
  });
});


app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});