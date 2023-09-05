import React from 'react';
import './Sidebar.css';

const Sidebar = ({ userName }) => {
    return (
        <nav className="sidebar">
            <div className="sidebar-user-info">
                {userName}
            </div>
            <div>
                <div>
                    <a href="/liferecord" className="sidebar-link">
                        내 생활기록부
                    </a>
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
