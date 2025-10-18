import axios from 'axios';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

const logger = new Logger('KiotVietAPI');

export const kiotvietApi = axios.create({
  baseURL: 'https://public.kiotapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: add interceptor to attach token dynamically
kiotvietApi.interceptors.request.use((config) => {
  const token = process.env.KIOTVIET_TOKEN;
  const retailer = process.env.KIOTVIET_RETAILER;

  if (!token || !retailer) {
    logger.error('Missing KiotViet credentials in environment variables');
  }

  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Retailer = retailer;

  return config;
});
