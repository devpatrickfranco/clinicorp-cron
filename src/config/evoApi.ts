import axios from 'axios';

export const evoApi = axios.create({
  baseURL: 'https://n8n-evolution-api.i4khe5.easypanel.host/message/sendText/Clnicas',
  headers: {
    apikey: process.env.EVO_TOKEN || ''
  }
});
