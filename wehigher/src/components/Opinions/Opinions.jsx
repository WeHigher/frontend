import React, { useState } from 'react';
import { api } from '../../Axios';
import { ModalManager } from '../ModalManager';

const OpinionModal = ({ schoolRecordId }) => {
    const { modalStates, openModal, closeModal } = ModalManager();
    const [opinions, setOpinions] = useState([]);

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
        const formattedOpinions = opinions.map((opinion) => ({
            grade: opinion.grade,
            content: opinion.content,
        }));

        api
            .post(`/school_record/opinion/${schoolRecordId}`, formattedOpinions)
            .then((response) => {
                console.log('행동특성 및 종합의견 생성 성공:', response.data);
                setOpinions([]);
                closeModal('isOpinionModalOpen'); // 모달 닫기
            })
            .catch((error) => {
                console.error('행동특성 및 종합의견 생성 실패:', error);
            });
    };

    return (
        <>
            {/* opinion section */}
            <div className="opinion-section">
                <div className="section-header">
                    <h4>행동특성 및 종합의견</h4>
                    <button className="btn btn-secondary" onClick={() => openModal('isOpinionModalOpen')}>
                        생성
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
            {modalStates.isOpinionModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-main">
                        <div className="modal-header">
                            <h5 className="modal-title">행동특성 및 종합의견 입력</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => closeModal('isOpinionModalOpen')}
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
        </>
    );
};

export default OpinionModal;
