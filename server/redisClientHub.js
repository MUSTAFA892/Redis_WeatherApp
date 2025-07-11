// server/redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv';


dotenv.config();


const client = createClient({
    username: 'default',
    password: "BegG3JWI9v7nHsswwOGwxUoo1K3Xp3kJ",
    socket: {
        host: "redis-11001.crce182.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 11001
    }
});

client.on('error', err => console.error('❌ Redis Client Error:', err));

await client.connect(); 

export default client;
