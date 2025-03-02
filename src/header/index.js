import React, { useState, useEffect } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";
import { FaInstagram } from "react-icons/fa";

const Headermain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("ovhidden");
  };

  const isActivePath = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      <header className={`site__header ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="nav-container">
          <Link className="navbar-brand" to="/">
            <span className="logo-text">{logotext}</span>
          </Link>
          
          <button className="menu__button" onClick={handleToggle} aria-label="Toggle menu">
            {isMenuOpen ? <VscClose className="close-icon" /> : <VscGrabber className="menu-icon" />}
          </button>
        </div>

        <div className={`site__navigation ${isMenuOpen ? "menu__opened" : ""}`}>
          <div className="bg__menu">
            <div className="menu__wrapper">
              <div className="menu__container">
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
      </header>
    </>
  );
};

export default Headermain;
