import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // API의 기본 URL 설정
  headers: {
    'Content-Type': 'application/json', // 요청의 Content-Type 설정
  },
});

export default api;
