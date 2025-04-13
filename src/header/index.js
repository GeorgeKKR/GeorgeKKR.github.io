import React, { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";
import { FaInstagram } from "react-icons/fa";
import "./style.css";

const Headermain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("ovhidden");
  };

  const isActivePath = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      <button className="corner-menu__button" onClick={handleToggle} aria-label="Toggle menu">
        {isMenuOpen ? <VscClose className="close-icon" /> : <HiMenuAlt3 />}
      </button>

      <div className={`site__navigation ${isMenuOpen ? "menu__opened" : ""}`}>
        <div className="bg__menu">
          <div className="menu__wrapper">
            <div className="menu__container">
              <div className="menu-header">
                <Link to="/" className="logo-text" onClick={handleToggle}>
                  {logotext}
                </Link>
              </div>
              <ul className="nav__menu">
                <li className={`menu_item ${isActivePath("/")}`}>
                  <Link onClick={handleToggle} to="/">Home</Link>
                </li>
                <li className={`menu_item ${isActivePath("/portfolio")}`}>
                  <Link onClick={handleToggle} to="/portfolio">Portfolio</Link>
                </li>
                <li className={`menu_item ${isActivePath("/about")}`}>
                  <Link onClick={handleToggle} to="/about">About</Link>
                </li>
                <li className={`menu_item ${isActivePath("/contact")}`}>
                  <Link onClick={handleToggle} to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="menu__footer">
            <div className="social__links">
              {socialprofils.instagram && (
                <a href={socialprofils.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              )}
            </div>
            <p className="copyright">© {new Date().getFullYear()} {logotext}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headermain;