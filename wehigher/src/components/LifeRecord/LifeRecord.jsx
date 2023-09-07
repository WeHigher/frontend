import React, { useState, useEffect } from 'react';
import api from '../../Axios.js';
import { Link } from 'react-router-dom';
import './LifeRecord.css';
import './Modal.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

import AwardsModal from '../Awards/Awards';
import CareerHopeModal from '../CareerHope/CareerHope';
import CreativeModal from '../Creative/Creative';
import EducationalModal from '../Educational/Educational';
import ReadingModal from '../Readings/Readings';
import OpinionModal from '../Opinions/Opinions';
import { ModalManager } from '../ModalManager.jsx';

const LifeRecord = () => {
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

  useEffect(() => {
    const accessToken = getAccessTokenFromCookie();
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    //  API 호출
    api
      .get('/user')
      .then((response) => {
        setUserName(response.data.name);
        const userSchoolRecordId = response.data.schoolRecordId;
        setSchoolRecordId(userSchoolRecordId);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 호출

  const [userName, setUserName] = useState('');
  const { modalStates, openModal, closeModal } = ModalManager();

  // 사용자 이름이 설정되면 화면에 표시
  const [schoolRecordId, setSchoolRecordId] = useState(null); // 생활기록부 ID

  return (
    <div className="app">
      {/* Navbar 모듈 렌더링 */}
      <Navbar userName={userName} />
      <div className="content-container">
        {/* Sidebar 모듈 렌더링 */}
        <Sidebar userName={userName} />
        <div className='main-content'>
          <AwardsModal
            isModalOpen={modalStates.isAwardModalOpen}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <CareerHopeModal
            isModalOpen={modalStates.isCareerModalOpen}

            schoolRecordId={schoolRecordId}
            api={api}
          />

          <CreativeModal
            isModalOpen={modalStates.isCreativeModalOpen}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <EducationalModal
            isModalOpen={modalStates.isEducationalModalOpen}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <ReadingModal
            isModalOpen={modalStates.isReadingModalOpen}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <OpinionModal
            isModalOpen={modalStates.isOpinionModalOpen}
            schoolRecordId={schoolRecordId}
            api={api}
          />
        </div>
      </div>
    </div>
  );
};

export default LifeRecord;
