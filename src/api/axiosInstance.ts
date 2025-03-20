import axios from 'axios';

/** kakao api */
export const kakaoApi = axios.create({
  baseURL: 'https://dapi.kakao.com/v3',
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});
