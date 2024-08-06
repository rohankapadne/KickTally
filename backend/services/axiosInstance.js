const axios = require("axios");
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-rapidapi-key": process.env.API_KEY,
  },
});

module.exports = axiosInstance;
