import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Main.css';

const MainDashboard = () => {
  useEffect(() => {
    //  API 호출
    axios
      .get('/api/user')
      .then((response) => {
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 호출

  const [userName, setUserName] = useState(''); // 상태(state) 초기값 설정

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

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>WeHigher</title>
        <link
          href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css"
          rel="stylesheet"
        />
        <link href="../styles/style.css" rel="stylesheet" />
        <script
          src="https://use.fontawesome.com/releases/v6.3.0/js/all.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-light bg-light">
          <a class="navbar-brand ps-3" href="/main">
            WeHigher
          </a>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              class="sb-sidenav accordion sb-sidenav-light"
              id="sidenavAccordion"
            >
              <div class="sb-sidenav-menu">
                <div class="nav">
                  <div class="sb-sidenav-menu-id">{renderUserName()}</div>
                  <div class="sb-sidenav-menu-heading">
                    <i class="fas fa-book-open"></i> 생활기록부
                  </div>
                  <a class="nav-link" href="/liferecord">
                    <div class="sb-nav-link-icon"></div>내 생활기록부
                  </a>
                  <div class="sb-sidenav-menu-heading">
                    <i class="fas fa-book-open"></i> 타임라인
                  </div>
                  <a class="nav-link" href="interview.html">
                    <div class="sb-nav-link-icon"></div>
                    모의면접 1
                  </a>
                  <a class="nav-link" href="interview.html">
                    <div class="sb-nav-link-icon"></div>
                    모의면접 2
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div class="container-fluid px-4">
                <h3 class="mt-4">완료된 면접</h3>
                <div class="row">
                  <div class="col-xl-3 col-md-6">
                    <div class="card text-black mb-4">
                      <div class="card-body">면접 1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container-fluid px-4">
                <h3 class="mt-4">진행중인 면접</h3>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <a class="small text-black stretched-link" href="#">
                    면접 생성
                  </a>
                </div>
                <div class="row">
                  <div class="col-xl-3 col-md-6">
                    <div class="card text-black mb-4">
                      <div class="card-body">면접 1</div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  );
};

export default MainDashboard;
