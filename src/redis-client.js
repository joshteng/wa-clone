import redis from 'redis';

let client = null;

function setup(){
  if (process.env.REDIS_URL) {
    console.log('connecting to cloud Redis');
    client = redis.createClient(process.env.REDIS_URL);
  }
  else {
    console.log('connecting to local redis');
    client = redis.createClient();
  }

  client.on('connect', () => {
    console.log('Connected to redis');
  });

  client.on('error', (err) => {
    console.log(err, 'redis error');
  });
}

export {setup as setupRedis, client as clientRedis};
