import React, { useState } from 'react';
import api from '../../Axios.js';
import { ModalManager } from '../ModalManager';

const AwardsModal = ({ schoolRecordId }) => {
    const { modalStates, openModal, closeModal } = ModalManager();
    const [awards, setAwards] = useState([]);

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

    const handleAwardFormSubmit = (event) => {
        event.preventDefault();

        const awardsData = awards.map((award) => ({
            title: award.name,
            tier: award.tier,
            date: award.date,
            institution: award.institution,
            target: award.target,
        }));

        // Assuming you have access to the 'api' here.
        api
            .post(`/school_record/award/${schoolRecordId}`, awardsData)
            .then((response) => {
                console.log('수상경력 데이터 전송 성공:', response.data);
                setAwards([]);
                closeModal('isAwardModalOpen'); // 모달 닫기
            })
            .catch((error) => {
                console.error('수상경력 데이터 전송 실패:', error);
            });
    };

    return (
        <>
            {/* awards section */}
            <section className="awards-section">
                <div className="section-header">
                    <h4>수상경력</h4>
                    <button className="btn btn-secondary" onClick={() => openModal('isAwardModalOpen')}>
                        생성
                    </button>
                </div>
                <div className="section-content">
                    {awards.length > 0 ? (
                        <div>
                            {awards.map((award, index) => (
                                <div key={index} className="career-hope-form">
                                    <p>수상명 {award.name}</p>
                                    <p>등급(위) {award.tier}</p>
                                    <p>수상일자 {award.date}</p>
                                    <p>수여기관 {award.institution}</p>
                                    <p>참가대상(참가인원) {award.target}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>수상경력이 설정되지 않았습니다.</p>
                    )}
                </div>
            </section>

            {modalStates.isAwardModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-main">
                        <div className="modal-header">
                            <h5 className="modal-title">수상경력 입력</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => closeModal('isAwardModalOpen')}
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
        </>
    );
};

export default AwardsModal;
