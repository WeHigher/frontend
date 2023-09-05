import React, { useState, useEffect } from 'react';
import api from '../../Axios.js';
import Navbar from '../Navbar/Navbar';
import InterviewCard from '../InterviewCard/InterviewCard';
import Sidebar from '../Sidebar/Sidebar';
import './Main.css';

const MainDashboard = () => {
  const [userName, setUserName] = useState('');
  const [hasRequestBeenMade, setHasRequestBeenMade] = useState(false);

  useEffect(() => {
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
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
