import 'dotenv/config';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.clinicorp.com/rest/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${process.env.CLINICORP_TOKEN}`
  }
});