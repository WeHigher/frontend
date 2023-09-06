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
  useEffect(() => {
    //  API 호출
    api
      .get('/user')
      .then((response) => {
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 호출

  const [userName, setUserName] = useState('');
  const { modalStates, openModal, closeModal } = ModalManager();

  // 사용자 이름이 설정되면 화면에 표시
  const renderUserName = () => {
    if (userName) {
      return (
        <h4>
          사용자 이름: <Link to="/mypage">{userName}</Link>
        </h4>
      );
    } else {
      return (
        <p>
          <Link to="/mypage">사용자 이름이 없습니다.</Link>
        </p>
      );
    }
  };

  const [schoolRecordId, setSchoolRecordId] = useState(null); // 생활기록부 ID

  useEffect(() => {
    // API 호출: 사용자 정보 가져오기
    api
      .get('/user')
      .then((response) => {
        const userSchoolRecordId = response.data.schoolRecordId;
        setSchoolRecordId(userSchoolRecordId);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });
  }, []);

  return (
    <html lang="en">
      {/* ... HTML structure ... */}
      <body class="sb-nav-fixed">
        <Navbar userName={userName} />
        <div id="layoutSidenav">
          <Sidebar userName={userName} />
          <main>
            <div class="card2 mb-4">
              <div class="card-header">내 생활기록부</div>
              <div class="card-body">
              </div>
            </div>
          </main>

          <AwardsModal
            isModalOpen={modalStates.isAwardModalOpen}
            closeModal={() => closeModal('isAwardModalOpen')}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <CareerHopeModal
            isModalOpen={modalStates.isCareerModalOpen}
            closeModal={() => closeModal('isCareerModalOpen')}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <CreativeModal
            isModalOpen={modalStates.isCreativeModalOpen}
            closeModal={() => closeModal('isCreativeModalOpen')}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <EducationalModal
            isModalOpen={modalStates.isEducationalModalOpen}
            closeModal={() => closeModal('isEducationalModalOpen')}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <ReadingModal
            isModalOpen={modalStates.isReadingModalOpen}
            closeModal={() => closeModal('isReadingModalOpen')}
            schoolRecordId={schoolRecordId}
            api={api}
          />

          <OpinionModal
            isModalOpen={modalStates.isOpinionModalOpen}
            closeModal={() => closeModal('isOpinionModalOpen')}
            schoolRecordId={schoolRecordId}
            api={api}
          />
        </div>
      </body>
    </html>
  );
};

export default LifeRecord;
