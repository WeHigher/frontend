import React, { useState, useEffect } from 'react';
import api from '../../Axios.js';

import Navbar from '../Navbar/Navbar';
import InterviewCard from '../InterviewCard/InterviewCard';
import Sidebar from '../Sidebar/Sidebar';
import './Main.css';

const MainDashboard = () => {
  const [userName, setUserName] = useState('');

  localStorage.setItem('accessToken', getAccessTokenFromCookie())

  useEffect(() => {
    // API 호출 및 setUserName으로 사용자 이름 설정
    api
      .get('/user')
      .then((response) => {
        setUserName(response.data.name);
        console.log('Success fetching user name:', userName);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  }, []);

  // 쿠키에서 액세스 토큰을 가져오는 함수
  function getAccessTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'accessToken') {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  // 면접 생성 버튼 클릭 핸들러
  const handleCreateInterview = () => {
    const requestData = {
      model: '',
      maxToken: null,
      prompt: '',
      role: ''
    };

    api
      .post(`/api/chatgpt/completion/chat`, requestData)
      .then((response) => {
        if (response.data) {
          const messages = response.data.messages.map((messageObject) => messageObject.message);
          const messageLines = messages.map((message) => message.split('\n'));
          localStorage.setItem('messageLines', JSON.stringify(messageLines));

          window.location.href = '/interview';
        }
      })
      .catch((error) => {
        console.error('Error creating interview:', error);
      });

    // window.location.href = '/interview';
  };

  return (
    <div className="app">
      {/* Navbar 모듈 렌더링 */}
      <Navbar userName={userName} />
      <div className="content-container">
        {/* Sidebar 모듈 렌더링 */}
        <Sidebar userName={userName} />
        <main className="main-content">
          <h3 className="section-title">완료된 면접</h3>
          <div>
            {/* InterviewCard 모듈 렌더링 */}
            <InterviewCard title="면접 1" />
          </div>
          <button onClick={handleCreateInterview}>면접 생성하기</button>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
