import React, { useState, useEffect } from 'react';
import api from '../../Axios.js';
import Navbar from '../Navbar/Navbar';
import InterviewCard from '../InterviewCard/InterviewCard';
import Sidebar from '../Sidebar/Sidebar';
import './Main.css';
import axios from 'axios'

const MainDashboard = () => {
  const [userName, setUserName] = useState('');
  const [hasRequestBeenMade, setHasRequestBeenMade] = useState(false);

  useEffect(() => {
    // 가져온 액세스 토큰을 변수에 저장
    const accessToken = getAccessTokenFromCookie();
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // API 호출 및 setUserName으로 사용자 이름 설정
    api
      .get('/user')
      .then((response) => {
        setUserName(response.data.name);
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
      if (name === 'access_token') {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  // 면접 생성 버튼 클릭 핸들러
  const handleCreateInterview = () => {
    const requestData = {
      model: '',
      maxtoken: '',
      prompt: '',
    };

    axios
      .post(`/api/chatgpt/completion/chat/`, requestData)
      .then((response) => {

      })
      .catch((error) => {
        console.error('Error creating interview:', error);
      });
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
