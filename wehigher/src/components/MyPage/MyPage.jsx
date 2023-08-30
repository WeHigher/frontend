import React, { useState, useEffect } from 'react';
import api from '../../Axios.js';
import './MyPage.css';

const MyPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 소셜 로그인 후 회원 정보 설정
  useEffect(() => {
    // API 호출을 통해 회원 정보 가져오기
    api
      .get('/user')
      .then((response) => {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []); // 빈 배열을 전달하여 최초 로딩시에만 호출

  const handleUpdateProfile = () => {
    const updatedData = {
      name,
      email,
      password: newPassword,
    };

    api
      .patch('/user', updatedData)
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  const handleDeleteAccount = () => {
    api
      .delete('/user')
      .then((response) => {
        console.log('Account deleted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });
  };

  return (
    <div className="my-page">
      <div className="section">
        <h3>회원 정보 조회</h3>
        <div className="form-group">
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>
        <div className="button-container">
          <button className="info-button" type="button">
            회원 정보 조회
          </button>
        </div>
      </div>

      <div className="section">
        <h3>회원 정보 수정</h3>
        <div className="form-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button
            className="update-button"
            type="button"
            onClick={handleUpdateProfile}
          >
            수정하기
          </button>
        </div>
      </div>

      <div className="section">
        <h3>회원 탈퇴</h3>
        <p>회원 탈퇴를 원하시면 아래 버튼을 클릭하세요.</p>
        <div className="button-container">
          <button
            className="delete-button"
            type="button"
            onClick={handleDeleteAccount}
          >
            회원 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
