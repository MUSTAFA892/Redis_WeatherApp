# 🌤️ Weather Forecast App with Redis Cache (Local & Cloud)

This project is a full-stack weather forecasting application built using **ReactJS** (frontend) and **Node.js + Express** (backend). It fetches real-time weather data from the [WeatherAPI](https://www.weatherapi.com/) and uses **Redis** (either locally or via Redis Cloud) to cache responses and reduce API calls.

---

## 📦 Features

* Real-time weather data from WeatherAPI
* Redis caching for performance and reduced API usage
* Supports both **Redis Cloud** and **Local Redis**
* Clean, animated UI in React
* Cache hit/miss tracking with response time measurement

---

## 🧠 Why Redis?

Redis is an in-memory data store often used as a cache to store frequently accessed data. This speeds up performance and reduces redundant API requests.

### Benefits:

* ⚡ Super fast (in-memory access)
* 🧠 Can set **TTL** (auto-expire old data)
* ✅ Optional persistence for local Redis
* ☁️ Cloud or local deployment supported

---

## 🛠️ Technologies Used

* ReactJS (Frontend)
* Node.js + Express (Backend)
* Redis (Caching layer)
* WeatherAPI (Weather data)
* Axios (HTTP client)

---

## 📁 Project Structure

```
Weather_Forecast_Redis/
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── ...
├── server/
│   ├── index.js               # Express server
│   ├── redisClientLocal.js   # Redis local connection
│   ├── redisClientHub.js     # Redis Cloud connection
│   └── .env                  # Optional config
└── README.md
```

---

## 🚀 Getting Started

### 📌 Prerequisites

* Node.js & npm
* Redis installed locally (for local setup)
* WeatherAPI key: [Get Free Key](https://www.weatherapi.com/)
* Redis Cloud account (optional): [Redis Cloud](https://cloud.redis.com/)

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-forecast-redis.git
cd weather-forecast-redis
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Choose one of the Redis clients:

#### 📍 Option A: Redis Cloud (Production/Remote)

**redisClientHub.js**

```js
import { createClient } from 'redis';

const client = createClient({
  username: 'default',
  password: 'YOUR_REDIS_CLOUD_PASSWORD',
  socket: {
    host: 'YOUR_REDIS_CLOUD_HOST',
    port: YOUR_REDIS_CLOUD_PORT
  }
});

await client.connect();
export default client;
```

#### 📍 Option B: Local Redis (Development)

**redisClientLocal.js**

```js
import { createClient } from 'redis';

const client = createClient(); // defaults to localhost:6379

await client.connect();
export default client;
```

Then in `index.js`, import the one you want to use:

```js
// import client from './redisClientHub.js'
import client from './redisClientLocal.js'
```

---

### 3. Start the Server

```bash
node index.js
```

> 🔥 Server running at: `http://localhost:5000`

---

### 4. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

> 🌐 Frontend running at: `http://localhost:5173`

---

## 🌐 API Endpoint (Backend)

```
GET /weather/:city
```

### Example:

```
GET http://localhost:5000/weather/london
```

### ✅ Output:

```json
{
  "source": "Redis Cache",
  "timeTaken": "10.41 ms",
  "data": { ... }
}
```

---

## 🔁 How Redis Works in This App

1. **Client requests `/weather/london`**
2. Server checks Redis:

   * If `london` is cached ➝ return it instantly ⚡
   * If not ➝ fetch from WeatherAPI, cache in Redis, and return
3. Cache entries expire after 1 hour (`EX: 3600`)

---

## 💻 Redis Local Setup (If Not Using Redis Cloud)

### Install Redis (Linux)

```bash
sudo pacman -S redis         # Arch/Manjaro
sudo systemctl start redis
sudo systemctl enable redis
```

### Test it:

```bash
redis-cli ping
# Output: PONG
```

---

## 🔐 Redis Cloud Setup (If Using Redis Hub)

1. Go to [Redis Cloud](https://cloud.redis.com/)
2. Create a free database
3. Copy the public endpoint, port, and password
4. Plug into `redisClientHub.js`

---

## 🧪 Testing Redis from Terminal

```bash
# Connect to local Redis
redis-cli

# Check keys
> keys *
> get london
> ttl london
```

Or for Redis Cloud:

```bash
redis-cli -u redis://default:<password>@<host>:<port>
```

---

## 🖼️ Frontend Preview

* Clean white background
* Animated card on load
* City input + weather info

> Customize `App.css` for full styling

---

## 🧹 Optional Improvements

* Add `/clear-cache` route
* Use `.env` to toggle between local/cloud Redis
* Add error boundaries and skeleton loaders

---

## ✅ Summary

| Task              | Tool/Concept          |
| ----------------- | --------------------- |
| Backend API       | Node.js + Express     |
| Weather API       | weatherapi.com        |
| Redis Integration | Cloud + Local support |
| Frontend          | ReactJS               |
| Caching Logic     | Redis with TTL        |

---

## 📜 License

This project is open-source and free to use for educational and development purposes.