import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: "https://scouts-tunisienne.herokuapp.com/",
  // baseURL: "http://localhost:5000/",
});

export default instance;
