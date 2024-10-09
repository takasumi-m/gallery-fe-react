import React from 'react';
import './Header.css';
import logoIcon from '../../assets/images/logo.png';

const Header = () => {

    return (
        <header className="header">
            <a href="/">
                <img src={logoIcon} alt="Photowave Logo" className="logo" />
                <h1>PhotoWave</h1>
            </a>
        </header>
    );
};

export default Header;