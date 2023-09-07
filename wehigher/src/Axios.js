import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:8080', // API의 기본 URL 설정
  headers: {
    'Content-Type': 'application/json', // 요청의 Content-Type 설정
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  },
});

export const apiAI = axios.create({
  baseURL: 'https://localhost:5000', // API의 기본 URL 설정
  headers: {
    'Content-Type': 'application/json', // 요청의 Content-Type 설정
  },
});

