import axiosInstance from './axiosInstance';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_API_BASE_URL = import.meta.env.VITE_KAKAO_REST_BASE_URL;

const kakaoApi = axiosInstance;
kakaoApi.defaults.baseURL = KAKAO_API_BASE_URL;

kakaoApi.interceptors.request.use((config) => {
  config.headers.Authorization = `KakaoAK ${KAKAO_API_KEY}`;
  return config;
});

export default kakaoApi;
