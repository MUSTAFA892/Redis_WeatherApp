// server/redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv';


dotenv.config();


const client = createClient({
    username: 'default',
    password: process.env.REDIS_DB_PASSWORD || "BegG3JWI9v7nHsswwOGwxUoo1K3Xp3kJ",
    socket: {
        host: process.env.REDIS_DB_HOST_URL || "redis-11001.crce182.ap-south-1-1.ec2.redns.redis-cloud.com:11001",
        port: Number(process.env.REDIS_DB_HOST_PORT) || 11001
    }
});

client.on('error', err => console.error('❌ Redis Client Error:', err));

await client.connect(); 

export default client;
