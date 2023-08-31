import React, { useState, useEffect } from 'react';
import api from '../../Axios.js';
import { Link } from 'react-router-dom';
import './LifeRecord.css';
import './Modal.css';

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

  /**********  수상경력 모달 **********/
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [awards, setAwards] = useState([]); // 수상 기록 배열

  const addAward = () => {
    setAwards([...awards, { title: '', date: '' }]);
  };

  const removeAward = (index) => {
    const newAwards = awards.filter((_, i) => i !== index);
    setAwards(newAwards);
  };

  const handleAwardChange = (event, index, field) => {
    const newAwards = [...awards];
    if (field === 'title') {
      newAwards[index].title = event.target.value;
    } else if (field === 'date') {
      newAwards[index].date = event.target.value;
    }
    setAwards(newAwards);
  };

  // 입력 폼 제출 핸들러
  const handleAwardFormSubmit = (event) => {
    event.preventDefault();

    // 데이터를 API에 POST 요청으로 전송
    api
      .post(`/school_record/award/${schoolRecordId}`, { awards })
      .then((response) => {
        console.log('수상경력 데이터 전송 성공:', response.data);
        closeModal('award'); // 모달 닫기
      })
      .catch((error) => {
        console.error('수상경력 데이터 전송 실패:', error);
      });
  };
  /********************************************/

  /********** 진로희망 모달 **********/
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false); // 진로희망 모달 열림 여부
  const [career, setCareer] = useState(''); // 진로희망 입력값

  const handleCareerFormSubmit = (event) => {
    event.preventDefault();

    api
      .post(`/school_record/career/${schoolRecordId}`, { career }) // API 호출
      .then((response) => {
        console.log('진로희망 생성 성공:', response.data);
        closeModal('career'); // 모달 닫기
      })
      .catch((error) => {
        console.error('진로희망 생성 실패:', error);
      });
  };
  /********************************************/

  /********** 창의적체험활동 모달 **********/
  const [isCreativeModalOpen, setIsCreativeModalOpen] = useState(false); // 창의적체험활동 모달 열림 여부
  const [creative, setCreative] = useState(''); // 창의적체험활동 입력값

  const handleCreativeFormSubmit = (event) => {
    event.preventDefault();

    api
      .post(`/school_record/creative/${schoolRecordId}`, { creative }) // API 호출
      .then((response) => {
        console.log('창의적체험활동 생성 성공:', response.data);
        closeModal('creative'); // 모달 닫기
      })
      .catch((error) => {
        console.error('창의적체험활동 생성 실패:', error);
      });
  };
  /********************************************/

  /********** 교과학습발달상황 모달 **********/
  const [isEducationalModalOpen, setIsEducationalModalOpen] = useState(false); // 교과학습발달상황 모달 열림 여부
  const [educational, setEducational] = useState(''); // 교과학습발달상황 입력값

  const handleEducationalFormSubmit = (event) => {
    event.preventDefault();
    // api를 사용하여 서버에 데이터 전송
    api
      .post(`/school_record/educational/${schoolRecordId}`, { educational }) // API 호출
      .then((response) => {
        console.log('교과학습발달상황 생성 성공:', response.data);
        closeModal('educational'); // 모달 닫기
      })
      .catch((error) => {
        console.error('교과학습발달상황 생성 실패:', error);
      });
  };
  /********************************************/

  /********** 독서활동 모달 **********/
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false); // 독서활동 모달 열림 여부
  const [reading, setReading] = useState(''); // 독서활동 입력값

  const handleReadingFormSubmit = (event) => {
    event.preventDefault();
    // api를 사용하여 서버에 데이터 전송
    api
      .post(`/school_record/reading/${schoolRecordId}`, { reading }) // API 호출
      .then((response) => {
        console.log('독서활동 생성 성공:', response.data);
        closeModal('reading'); // 모달 닫기
      })
      .catch((error) => {
        console.error('독서활동 생성 실패:', error);
      });
  };
  /********************************************/

  /********** 행동특성 및 종합의견 모달 **********/
  const [isOpinionModalOpen, setIsOpinionModalOpen] = useState(false); // 행동특성 및 종합의견 모달 열림 여부
  const [opinion, setOpinion] = useState(''); // 독서활동 입력값

  const handleOpinionFormSubmit = (event) => {
    event.preventDefault();
    // api를 사용하여 서버에 데이터 전송
    api
      .post(`/school_record/opinion/${schoolRecordId}`, { opinion }) // API 호출
      .then((response) => {
        console.log('행동특성 및 종합의견 생성 성공:', response.data);
        closeModal('opinion'); // 모달 닫기
      })
      .catch((error) => {
        console.error('행동특성 및 종합의견 생성 실패:', error);
      });
  };
  /********************************************/

  const openModal = (modalName) => {
    if (modalName === 'award') {
      setIsAwardModalOpen(true);
    } else if (modalName === 'career') {
      setIsCareerModalOpen(true);
    } else if (modalName === 'creative') {
      setIsCreativeModalOpen(true);
    } else if (modalName === 'educational') {
      setIsEducationalModalOpen(true);
    } else if (modalName === 'reading') {
      setIsReadingModalOpen(true);
    } else if (modalName === 'opinion') {
      setIsOpinionModalOpen(true);
    }
  };

  const closeModal = (modalName) => {
    if (modalName === 'award') {
      setIsAwardModalOpen(false);
      setAwards([]); // 모달 닫을 때 입력값 초기화
    } else if (modalName === 'career') {
      setIsCareerModalOpen(false);
      setCareer(''); // 모달 닫을 때 입력값 초기화
    } else if (modalName === 'creative') {
      setIsCreativeModalOpen(false);
      setCreative('');
    } else if (modalName === 'educational') {
      setIsEducationalModalOpen(false);
      setEducational('');
    } else if (modalName === 'reading') {
      setIsReadingModalOpen(false);
      setReading('');
    } else if (modalName === 'opinion') {
      setIsOpinionModalOpen(false);
      setReading('');
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
              <div class="card2 mb-4">
                <div class="card-header">내 생활기록부</div>
                <div class="card-body">
                  <ol class="breadcrumb mb-4">
                    <a
                      className="breadcrumb-item active"
                      href="#"
                      onClick={() => openModal('award')}
                    >
                      수상경력
                    </a>
                    <a
                      className="breadcrumb-item active"
                      href="#"
                      onClick={() => openModal('career')}
                    >
                      진로희망
                    </a>
                    <a
                      className="breadcrumb-item active"
                      href="#"
                      onClick={() => openModal('creative')}
                    >
                      창의적체험활동
                    </a>
                    <a
                      className="breadcrumb-item active"
                      href="#"
                      onClick={() => openModal('educational')}
                    >
                      교과학습발달상황
                    </a>
                    <a
                      className="breadcrumb-item active"
                      href="#"
                      onClick={() => openModal('reading')}
                    >
                      독서활동
                    </a>
                    <a
                      className="breadcrumb-item active"
                      href="#"
                      onClick={() => openModal('opinion')}
                    >
                      행동특성 및 종합의견
                    </a>
                  </ol>
                  {/* awards section */}
                  <section class="awards-section">
                    <div class="section-header">
                      <h4>수상경력</h4>
                      <button
                        class="btn btn-secondary"
                        onClick={() => openModal('award')}
                      >
                        수정
                      </button>
                    </div>
                    <div class="section-content">
                      {awards.map((award, index) => (
                        <div key={index} className="award-item">
                          <p>수상 제목: {award.title}</p>
                          <p>수상 날짜: {award.date}</p>
                          <button
                            class="btn btn-danger"
                            onClick={() => removeAward(index)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                  {/* career section */}
                  <div className="career-section">
                    <div className="section-header">
                      <h4>진로희망</h4>
                      <button
                        className="btn btn-secondary"
                        onClick={() => openModal('career')}
                      >
                        수정
                      </button>
                    </div>
                    <div className="section-content">
                      {career ? (
                        <p>{career}</p>
                      ) : (
                        <p>진로희망이 설정되지 않았습니다.</p>
                      )}
                    </div>
                  </div>
                  {/* creative section */}
                  <div className="creative-section">
                    <div className="section-header">
                      <h4>창의적체험활동</h4>
                      <button
                        className="btn btn-secondary"
                        onClick={() => openModal('creative')}
                      >
                        수정
                      </button>
                    </div>
                    <div className="section-content">
                      {creative ? (
                        <p>{creative}</p>
                      ) : (
                        <p>창의적체험활동 내용이 설정되지 않았습니다.</p>
                      )}
                    </div>
                  </div>
                  {/* educational section */}
                  <div className="educational-section">
                    <div className="section-header">
                      <h4>교과학습발달상황</h4>
                      <button
                        className="btn btn-secondary"
                        onClick={() => openModal('educational')}
                      >
                        수정
                      </button>
                    </div>
                    <div className="section-content">
                      {educational ? (
                        <p>{educational}</p>
                      ) : (
                        <p>교과학습발달상황 내용이 설정되지 않았습니다.</p>
                      )}
                    </div>
                  </div>
                  {/* reading section */}
                  <div className="reading-section">
                    <div className="section-header">
                      <h4>독서활동</h4>
                      <button
                        className="btn btn-secondary"
                        onClick={() => openModal('reading')}
                      >
                        수정
                      </button>
                    </div>
                    <div className="section-content">
                      {reading ? (
                        <p>{reading}</p>
                      ) : (
                        <p>독서활동 내용이 설정되지 않았습니다.</p>
                      )}
                    </div>
                  </div>

                  {/* opinion section */}
                  <div className="opinion-section">
                    <div className="section-header">
                      <h4>행동특성 및 종합의견</h4>
                      <button
                        className="btn btn-secondary"
                        onClick={() => openModal('opinion')}
                      >
                        수정
                      </button>
                    </div>
                    <div className="section-content">
                      {opinion ? (
                        <p>{opinion}</p>
                      ) : (
                        <p>행동특성 및 종합의견 내용이 설정되지 않았습니다.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* 수상경력 모달 */}
            {isAwardModalOpen && (
              <div className="modal-overlay">
                <div className="modal-main">
                  <div className="modal-header">
                    <h5 className="modal-title">수상경력 입력</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => closeModal('award')}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* 수상 기록 입력 폼 */}
                    <form onSubmit={handleAwardFormSubmit}>
                      {awards.map((award, index) => (
                        <div key={index} className="award-form">
                          <div className="form-group">
                            <label>수상 제목</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.title}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'title')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>수상 날짜</label>
                            <input
                              type="date"
                              className="form-control"
                              value={award.date}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'date')
                              }
                            />
                          </div>
                          <button
                            type="button"
                            className="modal-btn btn-danger"
                            onClick={() => removeAward(index)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="modal-btn btn-primary"
                        onClick={addAward}
                      >
                        추가하기
                      </button>
                      <div className="submit-button-container">
                        <button
                          type="submit"
                          className="modal-btn modal-btn-primary"
                        >
                          저장
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* 진로희망 모달 */}
            {isCareerModalOpen && (
              <div className="modal-overlay">
                <div className="modal-main">
                  <div className="modal-header">
                    <h5 className="modal-title">진로희망 입력</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => closeModal('career')}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleCareerFormSubmit}>
                      {/* 추가된 진로희망 입력 폼 */}
                      <div className="form-group">
                        <label>희망 진로</label>
                        <input
                          type="text"
                          className="form-control"
                          value={career}
                          onChange={(e) => setCareer(e.target.value)}
                        />
                      </div>
                      <div className="submit-button-container">
                        <button
                          type="submit"
                          className="modal-btn modal-btn-primary"
                        >
                          저장
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* 창의적체험활동 모달 */}
            {isCreativeModalOpen && (
              <div className="modal-overlay">
                <div className="modal-main">
                  <div className="modal-header">
                    <h5 className="modal-title">창의적체험활동 입력</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => closeModal('creative')}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleCreativeFormSubmit}>
                      <div className="form-group">
                        <label>창의적체험활동 내용</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={creative}
                          onChange={(e) => setCreative(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="modal-btn modal-btn-primary"
                      >
                        저장
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* 교과학습발달상황 모달 */}
            {isEducationalModalOpen && (
              <div className="modal-overlay">
                <div className="modal-main">
                  <div className="modal-header">
                    <h5 className="modal-title">교과학습발달상황 입력</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => closeModal('educational')}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleEducationalFormSubmit}>
                      <div className="form-group">
                        <label>교과학습발달상황 내용</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={educational}
                          onChange={(e) => setEducational(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="modal-btn modal-btn-primary"
                      >
                        저장
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* 독서활동 모달 */}
            {isReadingModalOpen && (
              <div className="modal-overlay">
                <div className="modal-main">
                  <div className="modal-header">
                    <h5 className="modal-title">독서활동 입력</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => closeModal('reading')}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleReadingFormSubmit}>
                      <div className="form-group">
                        <label>독서활동 내용</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={reading}
                          onChange={(e) => setReading(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="modal-btn modal-btn-primary"
                      >
                        저장
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* 행동특성 및 종합의견 모달 */}
            {isOpinionModalOpen && (
              <div className="modal-overlay">
                <div className="modal-main">
                  <div className="modal-header">
                    <h5 className="modal-title">행동특성 및 종합의견 입력</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => closeModal('opinion')}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleOpinionFormSubmit}>
                      <div className="form-group">
                        <label>행동특성 및 종합의견 내용</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={opinion}
                          onChange={(e) => setOpinion(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="modal-btn modal-btn-primary"
                      >
                        저장
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
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

export default LifeRecord;
