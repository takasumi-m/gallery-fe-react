import React from 'react';
import './Footer.css';
import homeIcon from '../assets/images/home.png';
import psotIcon from '../assets/images/post.png';
import searchIcon from '../assets/images/search.png';

const Footer = () => {
    return (
        <footer className="footer">
            <nav>
                <ul className="footer-nav">
                    <li><a href="/"><img src={homeIcon} /></a></li>
                    <li><a href="/search"><img src={searchIcon} /></a></li>
                    <li><a href="/post"><img src={psotIcon} /></a></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;