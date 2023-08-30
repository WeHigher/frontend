import React from 'react';
import axios from 'axios';
import './Login.css';

const SocialLoginApp = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/auth/kakao/callback';
  };

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080/auth/naver/callback';
  };

  return (
    <div className="container">
      <h1 className="title">소셜 로그인</h1>
      <button className="login-button kakao" onClick={handleKakaoLogin}>
        카카오로 로그인
      </button>
      <button className="login-button naver" onClick={handleNaverLogin}>
        네이버로 로그인
      </button>
    </div>
  );
};

export default SocialLoginApp;
