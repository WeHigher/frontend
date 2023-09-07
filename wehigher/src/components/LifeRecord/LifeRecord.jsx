import React, { useState, useEffect } from 'react';
import api from '../../Axios.js';
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import AwardsModal from '../Awards/Awards';
import CareerHopeModal from '../CareerHope/CareerHope';
import CreativeModal from '../Creative/Creative';
import EducationalModal from '../Educational/Educational';
import ReadingModal from '../Readings/Readings';
import OpinionModal from '../Opinions/Opinions';
import { ModalManager } from '../ModalManager.jsx';

import './LifeRecord.css';
import './Modal.css';

const LifeRecord = () => {
  useEffect(() => {
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
  const [schoolRecordId, setSchoolRecordId] = useState(''); // 생활기록부 ID

  return (
    <div className="app">
      {/* Navbar 모듈 렌더링 */}
      <Navbar userName={userName} />
      <div className="content-container">
        {/* Sidebar 모듈 렌더링 */}
        <Sidebar userName={userName} />
        <div className='main-content'>
          <AwardsModal
            schoolRecordId={schoolRecordId}
          />

          <CareerHopeModal
            schoolRecordId={schoolRecordId}
          />

          <CreativeModal
            schoolRecordId={schoolRecordId}
          />

          <EducationalModal
            schoolRecordId={schoolRecordId}
          />

          <ReadingModal
            schoolRecordId={schoolRecordId}
          />

          <OpinionModal
            schoolRecordId={schoolRecordId}
          />
        </div>
      </div>
    </div>
  );
};

export default LifeRecord;
