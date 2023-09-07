import React from 'react';
import api from '../../Axios.js';
import './Sidebar.css';

const Sidebar = ({ userName }) => {
    const handleLinkClick = (event) => {
        event.preventDefault(); // 기본 링크 동작 방지
        // POST 요청 보내기
        api.post('/school_record')
            .then((response) => {
                // POST 요청 성공 시 처리
                console.log('POST 요청 성공:', response.data);
                // window.location.href = '/liferecord';
            })
            .catch((error) => {
                // POST 요청 실패 시 처리
                console.error('POST 요청 실패:', error);
                // 오류 처리 또는 메시지 표시
            });
        window.location.href = '/liferecord';
    };

    return (
        <nav className="sidebar">
            <div className="sidebar-user-info">
                {userName}
            </div>
            <div>
                <div>
                    <p className="sidebar-link" onClick={handleLinkClick}>
                        내 생활기록부
                    </p>
                </div>
                {/* <div className="sidebar-divider"></div>
                <div>
                    <div className="sidebar-interview-link">
                        모의면접 1
                    </div>
                    <div className="sidebar-interview-link">
                        모의면접 2
                    </div>
                </div> */}
            </div>
        </nav>
    );
};

export default Sidebar;
