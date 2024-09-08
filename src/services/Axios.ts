import axios from 'axios';

const baseUrl =
  import.meta.env.VITE_RESERVATION_BASE_URL || 'https://localhost:7229/api/v1';

const client = axios.create({ baseURL: baseUrl });

export default client;
