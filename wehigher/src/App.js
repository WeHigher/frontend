import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Join from './components/Join';
import Login from './components/Login';
import Kakao from './auth/Kakao';
import Naver from './auth/Naver';
import User from './components/User';
import School_record from './components/School_record/School_record';
import Award from './components/School_record/Award';
import Career from './components/School_record/Career';
import Creative from './components/School_record/Creative';
import Educational from './components/School_record/Educational';
import Reading from './components/School_record/Reading';
import Opinion from './components/School_record/Opinion';
import Interview from './components/Interview';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/kakao" element={<Kakao />} />
          <Route path="/auth/naver" element={<Naver />} />
          <Route path="/user" element={<User />} />
          <Route path="/school_record" element={<School_record />} />
          <Route path="/opinion" element={<Opinion />} />
          <Route
            exact
            path="/school_record/award/:schoolRecordId"
            element={<Award />}
          />
          <Route
            exact
            path="/school_record/award/:awardId"
            element={<Award />}
          />
          <Route
            exact
            path="/school_record/career/:schoolRecordId"
            element={<Career />}
          />
          <Route
            exact
            path="/school_record/career/:careerId"
            element={<Career />}
          />
          <Route
            exact
            path="/school_record/creative/:schoolRecordId"
            element={<Creative />}
          />
          <Route
            exact
            path="/school_record/creative/:creativeId"
            element={<Creative />}
          />
          <Route
            exact
            path="/school_record/educational/:schoolRecordId"
            element={<Educational />}
          />
          <Route
            exact
            path="/school_record/educational/:id"
            element={<Educational />}
          />
          <Route
            exact
            path="/school_record/reading/:schoolRecordId"
            element={<Reading />}
          />
          <Route
            exact
            path="/school_record/reading/:id"
            element={<Reading />}
          />
          <Route
            exact
            path="/school_record/opinion/:schoolRecordId"
            element={<Opinion />}
          />
          <Route
            exact
            path="/school_record/opinion/:id"
            element={<Opinion />}
          />
          <Route exact path="/interview/:userId" element={<Interview />} />
          <Route exact path="/interview/:interviewId" element={<Interview />} />
        </Routes>
      </div>
    );
  }
}

export default App;
