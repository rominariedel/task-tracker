import axios from "axios";

const API_BASE_URL = "https://private-eda8f97-tasktrackerapi.apiary-mock.com";

const client = axios.create({
  baseURL: API_BASE_URL
});

export default client;
