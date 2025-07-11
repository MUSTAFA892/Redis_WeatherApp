// server/redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv';


dotenv.config();


const client = createClient({
    username: 'default',
    password: process.env.REDIS_DB_PASSWORD,
    socket: {
        host: process.env.REDIS_DB_HOST_URL,
        port: Number(process.env.REDIS_DB_HOST_PORT) 
    }
});

client.on('error', err => console.error('❌ Redis Client Error:', err));

await client.connect(); 

export default client;
