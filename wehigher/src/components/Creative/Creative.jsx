import React, { useState } from 'react';
import api from '../../Axios.js';
import { ModalManager } from '../ModalManager';

function CreativeActivityModal({ isCreativeModalOpen, closeModal, schoolRecordId }) {
    const { modalStates, openModal } = ModalManager();
    const [creativeActivities, setCreativeActivities] = useState([]);

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

    return (
        <>
            {/* creative section */}
            < div className="creative-section" >
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
            </div >

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
        </>
    );
}

export default CreativeActivityModal;
