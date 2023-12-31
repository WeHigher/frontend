import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login';
import Main from './components/Main/Main';
import LifeRecord from './components/LifeRecord/LifeRecord';
import MyPage from './components/MyPage/MyPage';
import Interview from './components/Interview/Interview';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/liferecord" element={<LifeRecord />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </Router>
  );
};

export default App;
