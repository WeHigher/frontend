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
  const [awards, setAwards] = useState([
    {
      name: '',
      tier: '',
      date: '',
      institution: '',
      target: '',
    },
  ]); // 수상 기록 배열

  const addAward = () => {
    setAwards([
      ...awards,
      {
        name: '',
        tier: '',
        date: '',
        institution: '',
        target: '',
      },
    ]);
  };

  const removeAward = (index) => {
    const newAwards = [...awards];
    newAwards.splice(index, 1);
    setAwards(newAwards);
  };

  const handleAwardChange = (event, index, field) => {
    if (
      awards &&
      Array.isArray(awards) &&
      index >= 0 &&
      index < awards.length
    ) {
      const newAwards = [...awards];
      if (newAwards[index]) {
        newAwards[index][field] = event.target.value;
        setAwards(newAwards);
      }
    }
  };

  // 입력 폼 제출 핸들러
  const handleAwardFormSubmit = (event) => {
    event.preventDefault();

    const awardsData = awards.map((award) => ({
      title: award.name,
      tier: award.tier,
      date: award.date,
      institution: award.institution,
      target: award.target,
    }));

    api
      .post(`/school_record/award/${schoolRecordId}`, { awards: awardsData })
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
  const [careerHope, setCareerHope] = useState([
    {
      grade: 1,
      specialtyOrInterest: '',
      studentHope: '',
      parentHope: '',
      reason: '',
    },
    {
      grade: 2,
      specialtyOrInterest: '',
      studentHope: '',
      parentHope: '',
      reason: '',
    },
    {
      grade: 3,
      specialtyOrInterest: '',
      studentHope: '',
      parentHope: '',
      reason: '',
    },
  ]);

  // 진로희망 입력값

  const handleCareerHopeChange = (event, index, field) => {
    const newCareerHope = [...careerHope];
    newCareerHope[index][field] = event.target.value;
    setCareerHope(newCareerHope);
  };

  const removeCareerHope = (index) => {
    const newCareerHope = careerHope.filter((_, i) => i !== index);
    setCareerHope(newCareerHope);
  };

  const handleCareerFormSubmit = (event) => {
    event.preventDefault();

    const careerData = careerHope.map((hope) => ({
      grade: hope.grade,
      specialtyOrInterest: hope.specialtyOrInterest,
      studentHope: hope.studentHope,
      parentHope: hope.parentHope,
      reason: hope.reason,
    }));

    api
      .post(`/school_record/career/${schoolRecordId}`, { career: careerData }) // API 호출
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
  const [creativeActivities, setCreativeActivities] = useState([]); // 창의적체험활동 입력값 초기화

  const handleCreativeChange = (event, index, field) => {
    const newCreativeActivities = [...creativeActivities];
    newCreativeActivities[index][field] = event.target.value;
    setCreativeActivities(newCreativeActivities);
  };

  const addCreativeActivity = () => {
    setCreativeActivities([
      ...creativeActivities,
      { grade: '', area: '', activityTime: '', specialty: '' },
    ]);
  };

  const removeCreativeActivity = (index) => {
    const newCreativeActivities = creativeActivities.filter(
      (_, i) => i !== index
    );
    setCreativeActivities(newCreativeActivities);
  };

  const handleCreativeFormSubmit = (event) => {
    event.preventDefault();

    // 데이터를 API에 POST 요청으로 전송
    api
      .post(`/school_record/creative/${schoolRecordId}`, { creativeActivities })
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
  const [educational, setEducational] = useState([]); // 교과학습발달상황 입력값

  const handleEducationalChange = (event, index, field) => {
    const newEducational = [...educational];
    newEducational[index][field] = event.target.value;
    setEducational(newEducational);
  };

  const addEducational = () => {
    setEducational([
      ...educational,
      {
        grade: 1,
        semester: '',
        subject: '',
        course: '',
        rank: 1,
        detailAndSpecialty: '',
      },
    ]);
  };

  const removeEducational = (index) => {
    const newEducational = educational.filter((_, i) => i !== index);
    setEducational(newEducational);
  };

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
  const [readings, setReadings] = useState([]); // 독서활동 입력값

  const handleReadingChange = (event, index, field) => {
    const newReadings = [...readings];
    newReadings[index][field] = event.target.value;
    setReadings(newReadings);
  };

  const addReading = () => {
    setReadings((prevReadings) => [
      ...prevReadings,
      {
        grade: 1,
        semester: '',
        title: '',
        subject: '',
      },
    ]);
  };

  const removeReading = (index) => {
    setReadings((prevReadings) => prevReadings.filter((_, i) => i !== index));
  };

  const handleReadingFormSubmit = (event) => {
    event.preventDefault();
    // api를 사용하여 서버에 데이터 전송
    api
      .post(`/school_record/reading/${schoolRecordId}`, { readings })
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
  const [opinions, setOpinions] = useState([]); // 행동특성 및 종합의견 입력값

  const handleOpinionChange = (event, index, field) => {
    const newOpinions = [...opinions];
    newOpinions[index][field] = event.target.value;
    setOpinions(newOpinions);
  };

  const addOpinion = () => {
    setOpinions((prevOpinions) => [
      ...prevOpinions,
      {
        grade: '',
        content: '',
      },
    ]);
  };

  const removeOpinion = (index) => {
    setOpinions((prevOpinions) => prevOpinions.filter((_, i) => i !== index));
  };

  const handleOpinionFormSubmit = (event) => {
    event.preventDefault();
    // API를 사용하여 서버에 데이터 전송
    const formattedOpinions = opinions.map((opinion) => ({
      grade: opinion.grade,
      content: opinion.content,
    }));

    api
      .post(`/school_record/opinion/${schoolRecordId}`, {
        opinions: formattedOpinions,
      })
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
      // setAwards([]); // 모달 닫을 때 입력값 초기화
    } else if (modalName === 'career') {
      setIsCareerModalOpen(false);
      // setCareerHope('');
    } else if (modalName === 'creative') {
      setIsCreativeModalOpen(false);
      // setCreativeActivities('');
    } else if (modalName === 'educational') {
      setIsEducationalModalOpen(false);
      // setEducational('');
    } else if (modalName === 'reading') {
      setIsReadingModalOpen(false);
      // setReading('');
    } else if (modalName === 'opinion') {
      setIsOpinionModalOpen(false);
      // setReading('');
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
                  <section className="awards-section">
                    <div className="section-header">
                      <h4>수상경력</h4>
                      <button
                        className="btn btn-secondary"
                        onClick={() => openModal('award')}
                      >
                        수정
                      </button>
                    </div>
                    <div className="section-content">
                      {awards.map((award, index) => (
                        <div key={index} className="award-form">
                          <div className="form-group">
                            <label>수상명</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.name}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'name')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>등급(위)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.tier}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'tier')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>수상일자</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.date}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'date')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>수여기관</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.institution}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'institution')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>참가대상(참가인원)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.target}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'target')
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
                      {careerHope.length > 0 ? (
                        <div>
                          {careerHope.map((hope, index) => (
                            <div key={index} className="career-hope-form">
                              <p>학년: {hope.grade}</p>
                              <p>특기 또는 흥미: {hope.specialtyOrInterest}</p>
                              <p>진로 희망 학생: {hope.studentHope}</p>
                              <p>진로 희망 학부모: {hope.parentHope}</p>
                              <p>희망 사유: {hope.reason}</p>
                            </div>
                          ))}
                        </div>
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
                      {creativeActivities.length > 0 ? (
                        <div>
                          {creativeActivities.map((activity, index) => (
                            <div key={index} className="creative-activity">
                              <p>학년: {activity.grade}</p>
                              <p>영역: {activity.area}</p>
                              <p>활동 시간: {activity.activityTime} 시간</p>
                              <p>특기사항: {activity.specialty}</p>
                            </div>
                          ))}
                        </div>
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
                      {educational.length > 0 ? (
                        <div>
                          {educational.map((data, index) => (
                            <div key={index}>
                              학년: {data.grade}<br />
                              학기: {data.semester}<br />
                              과목: {data.subject}<br />
                              코스: {data.course}<br />
                              순위: {data.rank}<br />
                              상세 및 특기사항: {data.detailAndSpecialty}
                            </div>
                          ))}
                        </div>
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
                      {readings.length > 0 ? (
                        <div>
                          {readings.map((activity, index) => (
                            <div key={index}>
                              <p>학년: {activity.grade}</p>
                              <p>학기: {activity.semester}</p>
                              <p>제목: {activity.title}</p>
                              <p>주제: {activity.subject}</p>
                            </div>
                          ))}
                        </div>
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
                      {opinions.length > 0 ? (
                        <div>
                          {opinions.map((opinion, index) => (
                            <div key={index}>
                              학년: {opinion.grade}
                              <br />
                              내용: {opinion.content}
                            </div>
                          ))}
                        </div>
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
                    <form onSubmit={handleAwardFormSubmit}>
                      {awards.map((award, index) => (
                        <div key={index} className="award-form">
                          <div className="form-group">
                            <label>수상명</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.name}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'name')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>등급(위)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.tier}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'tier')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>수상연월일</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.date}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'date')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>수여기관</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.institution}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'institution')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>참가대상(참가인원)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={award.target}
                              onChange={(e) =>
                                handleAwardChange(e, index, 'target')
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
                      {careerHope.map((hope, index) => (
                        <div key={index} className="career-hope-form">
                          <div className="form-group">
                            <label>학년</label>
                            <input
                              type="number"
                              className="form-control"
                              value={hope.grade}
                              onChange={(e) =>
                                handleCareerHopeChange(e, index, 'grade')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>특기 또는 흥미</label>
                            <input
                              type="text"
                              className="form-control"
                              value={hope.specialtyOrInterest}
                              onChange={(e) =>
                                handleCareerHopeChange(
                                  e,
                                  index,
                                  'specialtyOrInterest'
                                )
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>진로 희망 학생</label>
                            <input
                              type="text"
                              className="form-control"
                              value={hope.studentHope}
                              onChange={(e) =>
                                handleCareerHopeChange(e, index, 'studentHope')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>진로 희망 학부모</label>
                            <input
                              type="text"
                              className="form-control"
                              value={hope.parentHope}
                              onChange={(e) =>
                                handleCareerHopeChange(e, index, 'parentHope')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>희망 사유</label>
                            <input
                              type="text"
                              className="form-control"
                              value={hope.reason}
                              onChange={(e) =>
                                handleCareerHopeChange(e, index, 'reason')
                              }
                            />
                          </div>
                          <button
                            type="button"
                            className="modal-btn btn-danger"
                            onClick={() => removeCareerHope(index)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}

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
                      {creativeActivities.map((activity, index) => (
                        <div key={index} className="creative-activity-form">
                          <div className="form-group">
                            <label>학년</label>
                            <input
                              type="number"
                              className="form-control"
                              value={activity.grade}
                              onChange={(e) =>
                                handleCreativeChange(e, index, 'grade')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>영역</label>
                            <input
                              type="text"
                              className="form-control"
                              value={activity.area}
                              onChange={(e) =>
                                handleCreativeChange(e, index, 'area')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>활동 시간</label>
                            <input
                              type="number"
                              className="form-control"
                              value={activity.activityTime}
                              onChange={(e) =>
                                handleCreativeChange(e, index, 'activityTime')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>특기사항</label>
                            <input
                              type="text"
                              className="form-control"
                              value={activity.specialty}
                              onChange={(e) =>
                                handleCreativeChange(e, index, 'specialty')
                              }
                            />
                          </div>
                          <button
                            type="button"
                            className="modal-btn btn-danger"
                            onClick={() => removeCreativeActivity(index)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="modal-btn btn-primary"
                        onClick={addCreativeActivity}
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
                      {educational.map((data, index) => (
                        <div key={index} className="educational-data">
                          <div className="form-group">
                            <label>학년</label>
                            <input
                              type="number"
                              className="form-control"
                              value={data.grade}
                              onChange={(e) =>
                                handleEducationalChange(e, index, 'grade')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>학기</label>
                            <input
                              type="text"
                              className="form-control"
                              value={data.semester}
                              onChange={(e) =>
                                handleEducationalChange(e, index, 'semester')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>과목</label>
                            <input
                              type="text"
                              className="form-control"
                              value={data.subject}
                              onChange={(e) =>
                                handleEducationalChange(e, index, 'subject')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>코스</label>
                            <input
                              type="text"
                              className="form-control"
                              value={data.course}
                              onChange={(e) =>
                                handleEducationalChange(e, index, 'course')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>순위</label>
                            <input
                              type="number"
                              className="form-control"
                              value={data.rank}
                              onChange={(e) =>
                                handleEducationalChange(e, index, 'rank')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>상세 및 특기사항</label>
                            <textarea
                              className="form-control"
                              rows="4"
                              value={data.detailAndSpecialty}
                              onChange={(e) =>
                                handleEducationalChange(
                                  e,
                                  index,
                                  'detailAndSpecialty'
                                )
                              }
                            />
                          </div>
                          <button
                            type="button"
                            className="modal-btn btn-danger"
                            onClick={() => removeEducational(index)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="modal-btn btn-primary"
                        onClick={addEducational}
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
                      {readings.map((readingData, index) => (
                        <div key={index} className="form-group">
                          <label>학년</label>
                          <input
                            type="number"
                            className="form-control"
                            value={readingData.grade}
                            onChange={(e) =>
                              handleReadingChange(e, index, 'grade')
                            }
                          />
                          <label>학기</label>
                          <input
                            type="text"
                            className="form-control"
                            value={readingData.semester}
                            onChange={(e) =>
                              handleReadingChange(e, index, 'semester')
                            }
                          />
                          <label>제목</label>
                          <input
                            type="text"
                            className="form-control"
                            value={readingData.title}
                            onChange={(e) =>
                              handleReadingChange(e, index, 'title')
                            }
                          />
                          <label>주제</label>
                          <input
                            type="text"
                            className="form-control"
                            value={readingData.subject}
                            onChange={(e) =>
                              handleReadingChange(e, index, 'subject')
                            }
                          />
                          <button
                            type="button"
                            className="modal-btn btn-danger"
                            onClick={() => removeReading(index)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="modal-btn btn-primary"
                        onClick={addReading}
                      >
                        추가하기
                      </button>
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
                      {opinions.map((opinion, index) => (
                        <div key={index} className="opinion-data">
                          <div className="form-group">
                            <label>학년</label>
                            <input
                              type="text"
                              className="form-control"
                              value={opinion.grade}
                              onChange={(e) =>
                                handleOpinionChange(e, index, 'grade')
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>내용</label>
                            <textarea
                              className="form-control"
                              rows="4"
                              value={opinion.content}
                              onChange={(e) =>
                                handleOpinionChange(e, index, 'content')
                              }
                            />
                          </div>
                          <button
                            type="button"
                            className="modal-btn btn-danger"
                            onClick={() => removeOpinion(index)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="modal-btn btn-primary"
                        onClick={addOpinion}
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
