import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta, dataportfolio, dataabout } from "../../content_option";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AOS from 'aos';

export const Home = () => {
  const parallaxRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const profileImageRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Filter featured videos - specifying each video we want
  const featuredVideos = dataportfolio.filter(item => 
    item.id === "zigzag" || item.id === "bisous" || item.id === "necklace"
  );
  
  console.log("Featured videos:", featuredVideos); // Debug log

  useEffect(() => {
    // Initialize AOS for scroll animations
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
      if (titleRef.current) {
        const scrollY = window.scrollY;
        titleRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
        titleRef.current.style.opacity = 1 - scrollY * 0.003;
      }
      if (textRef.current) {
        const scrollY = window.scrollY;
        textRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        textRef.current.style.opacity = 1 - scrollY * 0.003;
      }
      if (profileImageRef.current) {
        const scrollY = window.scrollY;
        profileImageRef.current.style.transform = `translateY(${scrollY * -0.15}px) rotate(${scrollY * 0.02}deg)`;
      }
      
      // Show scroll button when user scrolls down a bit
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to open video in the portfolio page
  const openVideoInPortfolio = (videoId) => {
    localStorage.setItem('selectedProjectId', videoId);
    window.location.href = '/portfolio';
  };
  
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      
      {/* Hero Section - Full viewport height */}
      <div className="hero-section" style={{
        height: '100vh',
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div className="hero-background">
          <div 
            ref={parallaxRef}
            className="parallax-bg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '120%',
              backgroundImage: 'linear-gradient(-45deg, #0b1628, #233443, #39586a, #1a2538)',
              backgroundSize: '400% 400%',
              animation: 'gradientAnimation 15s ease infinite'
            }}
          ></div>
          <div className="overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(11, 22, 40, 0.4), rgba(11, 22, 40, 0.7))',
            backdropFilter: 'blur(8px)',
            zIndex: 1
          }}></div>
        </div>
        
        <div className="content-container" style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
          <div className="hero-content-wrap" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px'
          }}>
            <div className="hero-text-content">
              <h1 ref={titleRef} className="name-title">{introdata.title}</h1>
              <div className="typewriter-container">
                <Typewriter
                  options={{
                    strings: [
                      introdata.animated.first,
                      introdata.animated.second,
                      introdata.animated.third,
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 15,
                    delay: 80,
                  }}
                />
              </div>
              <p className="intro-description" ref={textRef}>{introdata.description}</p>
              
              <div className="intro-actions">
                <Link to="/portfolio" className="btn-primary">
                  View Portfolio
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Me
                </Link>
              </div>
            </div>
            
            <div className="hero-image" ref={profileImageRef} style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
              <div className="profile-frame" style={{ animation: 'float 6s ease-in-out infinite' }}>
                <img 
                  src={dataabout.profile_img} 
                  alt="George Kelly" 
                  className="profile-pic"
                  onError={(e) => {
                    console.error("Failed to load profile image");
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/350x350?text=George+Kelly";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Videos Section - Simplified */}
      <div id="featured-videos" style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--color-2)',
        position: 'relative',
        padding: '120px 0 150px',
        borderTop: '2px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 -25px 50px rgba(0, 0, 0, 0.5)'
      }}>
        <Container>
          <Row className="mb-5">
            <Col lg={12} className="text-center">
              <h2 style={{ 
                fontSize: '3.5rem', 
                marginBottom: '30px', 
                color: 'white',
                fontWeight: '700'
              }}>Featured Videos</h2>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: '1.2rem',
                maxWidth: '800px',
                margin: '0 auto 60px',
                lineHeight: '1.7'
              }}>
                A selection of my best work in filmmaking and video production. Click on any video to watch it in full screen with details.
              </p>
            </Col>
          </Row>
          
          <Row>
            {featuredVideos.map((video, index) => (
              <Col md={4} key={video.id} className="mb-4">
                <div 
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                    backgroundColor: '#192336',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onClick={() => openVideoInPortfolio(video.id)}
                >
                  {/* Video Thumbnail */}
                  <div style={{
                    position: 'relative',
                    paddingBottom: '56.25%', 
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={video.img} 
                      alt={video.title} 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }} 
                    />
                    {/* Play button */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      backdropFilter: 'blur(5px)'
                    }}>
                      <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft: '18px solid white',
                        marginLeft: '5px'
                      }}></div>
                    </div>
                  </div>
                  
                  {/* Video info */}
                  <div style={{
                    padding: '25px',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      background: 'linear-gradient(90deg, var(--color-5), #3a8bd8)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      marginBottom: '15px',
                      textTransform: 'capitalize',
                      fontWeight: '500'
                    }}>{video.category}</span>
                    
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      marginBottom: '12px',
                      lineHeight: '1.3'
                    }}>{video.title}</h3>
                    
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>{video.description}</p>
                    
                    <div style={{
                      display: 'inline-block',
                      color: 'var(--color-5)',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      marginTop: 'auto'
                    }}>
                      Watch Video
                      <span style={{ marginLeft: '8px' }}>→</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          
          <Row className="mt-5">
            <Col lg={12} className="text-center">
              <Link to="/portfolio" style={{
                display: 'inline-block',
                padding: '15px 40px',
                background: 'linear-gradient(90deg, var(--color-5), #3a8bd8)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(30, 135, 229, 0.3)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.95rem',
                marginTop: '20px'
              }}>
                View All Work
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </HelmetProvider>
  );
};
