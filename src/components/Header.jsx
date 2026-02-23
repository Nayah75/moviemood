import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>🎬 MovieMood</h1>
          </div>
          
          <nav className="nav">
            <a href="#" className="nav-link active">Home</a>
            <a href="#" className="nav-link">Movies</a>
            <a href="#" className="nav-link">TV Shows</a>
            <a href="#" className="nav-link">Categories</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
