import React, { useState } from 'react';
import api from '../../Axios.js';
import { ModalManager } from '../ModalManager';

function ReadingActivityModal({ schoolRecordId }) {
    const { modalStates, openModal, closeModal } = ModalManager();
    const [readings, setReadings] = useState([]);

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

        if (schoolRecordId) {
            api
                .post(`/school_record/reading/${schoolRecordId}`, readings)
                .then((response) => {
                    console.log('독서활동 생성 성공:', response.data);
                    closeModal('isReadingModalOpen'); // 모달 닫기
                })
                .catch((error) => {
                    console.error('독서활동 생성 실패:', error);
                });
        }
    };

    return (
        <>
            {/* reading section */}
            <div className="reading-section">
                <div className="section-header">
                    <h4>독서활동</h4>
                    <button className="btn btn-secondary" onClick={() => openModal('isReadingModalOpen')}>
                        생성
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

            {modalStates.isReadingModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-main">
                        <div className="modal-header">
                            <h5 className="modal-title">독서활동 입력</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => closeModal('isReadingModalOpen')}
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
        </>
    );
}

export default ReadingActivityModal;
