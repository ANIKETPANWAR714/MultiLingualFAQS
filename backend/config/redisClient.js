require("dotenv").config();
console.log(process.env.UNAME)
const redis = require("redis");
const redisClient = redis.createClient({
  username: process.env.UNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-15408.c14.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 15408,
  },
});

redisClient.on("error", (err) => console.log("Redis redisClient Error", err));

redisClient.on("connect", () => console.log("Connected to Redis"));

redisClient
  .connect()
  .then(() => {
    console.log("Redis client connected");
  })
  .catch((err) => {
    console.error("Error connecting to Redis:", err);
  });

redisClient.set("foo", "bar");
module.exports = redisClient;
