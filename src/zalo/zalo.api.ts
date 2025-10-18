import axios from 'axios';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

const logger = new Logger('zaloApi');

export const zaloApi = axios.create({
  baseURL: 'https://openapi.zalo.me/v3.0/oa',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: add interceptor to attach token dynamically
zaloApi.interceptors.request.use((config) => {
  const token = process.env.ZALO_ACCESS_TOKEN;

  if (!token) {
    logger.error('Missing Zalo credentials in environment variables');
  }

  config.headers.access_token = token;

  return config;
});
