import axios from 'axios';

const defaultInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 공통 인터셉터
defaultInstance.interceptors.request.use((config) => {
  return config;
});

export default defaultInstance;
