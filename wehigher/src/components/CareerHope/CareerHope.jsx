import React, { useState } from 'react';
import { api } from '../../Axios';
import { ModalManager } from '../ModalManager';

const CareerHopeModal = ({ schoolRecordId }) => {
    const { modalStates, openModal, closeModal } = ModalManager();
    const [careerHope, setCareerHope] = useState([]);

    const handleCareerHopeChange = (event, index, field) => {
        const newCareerHope = [...careerHope];
        newCareerHope[index][field] = event.target.value;
        setCareerHope(newCareerHope);
    };

    const addCareerHope = () => {
        setCareerHope([
            ...careerHope,
            {
                grade: 1,
                specialtyOrInterest: '',
                studentHope: '',
                parentHope: '',
                reason: '',
            },
        ]);
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

        // Assuming you have access to the 'api' here.
        api
            .post(`/school_record/career/${schoolRecordId}`, careerData) // API 호출
            .then((response) => {
                console.log('진로희망 생성 성공:', response.data);
                setCareerHope([]);
                closeModal('isCareerModalOpen'); // 모달 닫기
            })
            .catch((error) => {
                console.error('진로희망 생성 실패:', error);
            });
    };

    return (
        <>
            {/* career section */}
            <div className="career-section">
                <div className="section-header">
                    <h4>진로희망</h4>
                    <button className="btn btn-secondary" onClick={() => openModal('isCareerModalOpen')}>
                        생성
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

            {modalStates.isCareerModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-main">
                        <div className="modal-header">
                            <h5 className="modal-title">진로희망 입력</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => closeModal('isCareerModalOpen')}
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
                                <button
                                    type="button"
                                    className="modal-btn btn-primary"
                                    onClick={addCareerHope}
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

export default CareerHopeModal;
