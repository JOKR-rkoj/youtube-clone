import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import menu_icon from "../../assets/menu.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import logo1 from "../../assets/YouTube_Logo_2017.svg";
const Navbar = ({
  setSidebar,
  input,
  setInput,
  searchVideos,
  setSearchVideos,
}) => {
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <nav className="navbar">
      <div className="nav-left flex-div">
        <img
          src={menu_icon}
          alt=""
          className="menu-icon"
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
        />
        <Link to="/youtube-clone">
          <img
            src={logo1}
            alt=""
            className="logo"
          />
        </Link>
      </div>
      <div className="nav-middle">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Search"
        />
        <Link to={`/search/${input.length && input}`}>
          <img
            src={search_icon}
            onClick={() =>
              searchVideos ? setSearchVideos(false) : setSearchVideos(true)
            }
            alt=""
            className="search-icon"
          />
        </Link>
      </div>
      <div className="nav-right">
        <img src={upload_icon} alt="" className="upload-icon" />
        <img src={more_icon} alt="" className="more-icon" />
        <img src={notification_icon} alt="" className="notification-icon" />
        <img src={profile_icon} className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
