// server/redisClient.js
import { createClient } from 'redis';

const client = createClient(); 

client.on('error', err => console.error('❌ Redis Client Error:', err));

await client.connect();

export default client;
