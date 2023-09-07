// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userName }) => {
    return (
        <nav className="navbar">
            <Link to="/main" className="navbar-logo">
                WeHigher
            </Link>
            {/* <div className="navbar-user">
                {userName ? (
                    <Link to="/mypage">사용자 이름: {userName}</Link>
                ) : (
                    <Link to="/mypage">사용자 이름이 없습니다.</Link>
                )}
            </div> */}
        </nav>
    );
};

export default Navbar;
