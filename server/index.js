// server/index.js
import express from 'express';
import axios from 'axios';
import client from './redisClientHub.js'; 
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.use(cors());

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city.toLowerCase();

    try {
    
        const cachedData = await client.get(city);
        if (cachedData) {
            console.log('✅ Cache Hit');
            return res.json(JSON.parse(cachedData));
        }

    
        console.log('❌ Cache Miss');
        const response = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
        );

        
        await client.setEx(city, 3600, JSON.stringify(response.data));

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
