import React, { useState } from 'react';
import api from '../../Axios.js';
import { ModalManager } from '../ModalManager';

const EducationalModal = ({ isEducationalModalOpen, schoolRecordId }) => {
    const { modalStates, openModal, closeModal } = ModalManager();
    const [educational, setEducational] = useState([]);

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
                closeModal('isEducationalModalOpen'); // 모달 닫기
            })
            .catch((error) => {
                console.error('교과학습발달상황 생성 실패:', error);
            });
    };

    return (
        <>
            {/* educational section */}
            <div className="educational-section">
                <div className="section-header">
                    <h4>교과학습발달상황</h4>
                    <button className="btn btn-secondary" onClick={() => openModal('isEducationalModalOpen')}>
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

            {modalStates.isEducationalModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-main">
                        <div className="modal-header">
                            <h5 className="modal-title">교과학습발달상황 입력</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => closeModal('isEducationalModalOpen')}
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
        </>
    );
};

export default EducationalModal;
