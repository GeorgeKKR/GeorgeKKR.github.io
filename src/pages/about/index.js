import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { FaCamera, FaFilm, FaLaptop, FaGraduationCap, FaQuoteLeft, FaBriefcase, FaClock, FaUsers, FaTimes } from "react-icons/fa";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
  professionalImages,
  education,
} from "../../content_option";

export const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    timeline: true, 
    skills: true,
    education: true,
    philosophy: true,
    camera: true,
    services: true
  });
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const timelineRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const philosophyRef = useRef(null);
  const cameraRef = useRef(null);
  const servicesRef = useRef(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Check if element is in viewport
  const isInViewport = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  };

  // Image preloading function
  const preloadImages = () => {
    const imageUrls = [
      dataabout.profile_img,
      dataabout.camera_work_img1,
      dataabout.camera_work_img2,
      ...(professionalImages?.images?.map(img => img.img) || [])
    ];
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    imageUrls.forEach(src => {
      if (!src) {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsLoaded(true);
        }
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        console.error(`Failed to load image: ${src}`);
        if (loadedCount === totalImages) {
          setIsLoaded(true);
        }
      };
      img.src = src;
    });
    
    // Fallback in case images don't load
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  };

  // Handle scroll to reveal animations
  const handleScroll = () => {
    // All sections are visible by default, but we'll still track for animation purposes
    if (timelineRef.current && isInViewport(timelineRef.current)) {
      setVisibleSections(prev => ({ ...prev, timeline: true }));
    }
    if (skillsRef.current && isInViewport(skillsRef.current)) {
      setVisibleSections(prev => ({ ...prev, skills: true }));
    }
    if (educationRef.current && isInViewport(educationRef.current)) {
      setVisibleSections(prev => ({ ...prev, education: true }));
    }
    if (philosophyRef.current && isInViewport(philosophyRef.current)) {
      setVisibleSections(prev => ({ ...prev, philosophy: true }));
    }
    if (cameraRef.current && isInViewport(cameraRef.current)) {
      setVisibleSections(prev => ({ ...prev, camera: true }));
    }
    if (servicesRef.current && isInViewport(servicesRef.current)) {
      setVisibleSections(prev => ({ ...prev, services: true }));
    }
  };

  useEffect(() => {
    // Preload images
    preloadImages();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check for elements in viewport
    handleScroll();
    
    // Set page as loaded after a maximum wait time
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Force all sections to be visible after a delay
      setVisibleSections({
        hero: true,
        timeline: true, 
        skills: true,
        education: true,
        philosophy: true,
        camera: true,
        services: true
      });
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <HelmetProvider>
      <Container className="about-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        
        {/* Hero Section */}
        <div className={`about-hero ${isLoaded ? 'fade-in' : ''}`}>
          <Row className="align-items-center">
            <Col lg={6} className="hero-text">
              <h1 className="display-3 fw-bold text-gradient">
                I'm George Kelly
              </h1>
              <div className="divider"></div>
              <p className="lead mt-4">
                {dataabout.aboutme}
              </p>
            </Col>
            <Col lg={6}>
              <div className="profile-frame">
                <div className="profile-image-wrapper">
                  <img 
                    src={dataabout.profile_img} 
                    alt="Profile" 
                    className="profile-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x500?text=Profile";
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        
        {/* Work Experience Section */}
        <div 
          ref={timelineRef} 
          className={`timeline-section section-spacing ${visibleSections.timeline ? 'fade-in' : ''}`}
        >
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title">Work Experience</h2>
              <div className="section-divider mx-auto"></div>
            </Col>
          </Row>
          
          <Row>
            <Col lg={12}>
              <div className="timeline">
                {worktimeline.map((work, index) => (
                  <div 
                    key={index} 
                    className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${visibleSections.timeline ? 'fade-in-item' : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="timeline-content">
                      <h4 className="timeline-title">{work.jobtitle}</h4>
                      <div className="timeline-location">{work.where}</div>
                      <p className="timeline-description">{work.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
        
        {/* Education Section */}
        <div 
          ref={educationRef}
          className={`education-section section-spacing ${visibleSections.education ? 'fade-in' : ''}`}
        >
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title">Education</h2>
              <div className="section-divider mx-auto"></div>
            </Col>
          </Row>
          
          <Row className="education-container">
            {education.map((item, index) => (
              <Col lg={6} md={6} key={index} className="mb-4">
                <div
                  className={`education-card ${visibleSections.education ? 'fade-in-item' : ''}`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="education-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="education-year">{item.year}</div>
                  <h3 className="education-degree">{item.degree}</h3>
                  <div className="education-institution">{item.institution}</div>
                  <p className="education-description">{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        
        {/* Skills Section */}
        <div 
          ref={skillsRef}
          className={`skills-section section-spacing ${visibleSections.skills ? 'fade-in' : ''}`}
        >
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title">Skills</h2>
              <div className="section-divider mx-auto"></div>
            </Col>
          </Row>
          
          <Row className="skills-container">
            {skills.map((skill, index) => (
              <Col md={6} key={index}>
                <div
                  className="skill-item"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="skill-info">
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className="skill-percentage">{skill.value}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className={`skill-progress ${visibleSections.skills ? 'animate-progress' : ''}`}
                      style={{ width: visibleSections.skills ? `${skill.value}%` : '0%' }}
                    >
                      <div className="skill-progress-bar"></div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        
        {/* Philosophy Section */}
        <div 
          ref={philosophyRef}
          className={`philosophy-section section-spacing ${visibleSections.philosophy ? 'fade-in' : ''}`}
        >
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title">My Philosophy</h2>
              <div className="section-divider mx-auto"></div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={10} md={12}>
              <div className={`philosophy-card ${visibleSections.philosophy ? 'fade-in-item' : ''}`}>
                <div className="quote-icon">
                  <FaQuoteLeft />
                </div>
                <p className="philosophy-text">
                  {dataabout.philosophy}
                </p>
              </div>
            </Col>
          </Row>
        </div>
        
        {/* Behind the Camera Section */}
        <div 
          ref={cameraRef}
          className={`camera-work-section section-spacing ${visibleSections.camera ? 'fade-in' : ''}`}
        >
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title">{professionalImages.title}</h2>
              <div className="section-divider mx-auto"></div>
              <p className="lead text-center mb-5">{professionalImages.description}</p>
            </Col>
          </Row>
          
          <Row>
            <Col lg={12}>
              <div className="camera-work-grid">
                {professionalImages.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`camera-work-card ${visibleSections.camera ? 'fade-in-item' : ''}`}
                    style={{ transitionDelay: `${index * 0.2}s` }}
                  >
                    <div className="card-image">
                      <img 
                        src={image.img} 
                        alt={image.title} 
                        onClick={() => handleImageClick(image)}
                        className="clickable-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x300?text=Camera+Work";
                        }}
                      />
                      <div className="card-overlay">
                        <h4>{image.title}</h4>
                        <p>{image.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
        
        {/* Key Strengths Section */}
        <div className="services-section section-spacing fade-in">
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title">Key Strengths</h2>
              <div className="section-divider mx-auto"></div>
            </Col>
          </Row>
          
          <Row className="services-container">
            <Col lg={4} md={6}>
              <div className="service-card fade-in-item">
                <div className="service-icon">
                  <FaBriefcase />
                </div>
                <h3 className="service-title">Production Management</h3>
                <p className="service-description">
                  Experienced in orchestrating filming schedules, managing equipment, and ensuring efficient workflow for timely project completion.
                </p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="service-card fade-in-item">
                <div className="service-icon">
                  <FaCamera />
                </div>
                <h3 className="service-title">Creative Direction</h3>
                <p className="service-description">
                  Skilled in spearheading high-engagement content production, developing detailed storyboards, and overseeing the creative process.
                </p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="service-card fade-in-item">
                <div className="service-icon">
                  <FaUsers />
                </div>
                <h3 className="service-title">Team Collaboration</h3>
                <p className="service-description">
                  Strong team player with the ability to quickly adapt to new environments and collaborate effectively with diverse teams.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      
      {/* Image Details Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered
        className="image-modal"
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>{selectedImage?.title}</Modal.Title>
          <button className="close-button" onClick={handleCloseModal}>
            <FaTimes />
          </button>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <div className="modal-content">
              <div className="modal-image-container">
                <img 
                  src={selectedImage.img} 
                  alt={selectedImage.title} 
                  className="modal-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Available";
                  }}
                />
              </div>
              <div className="modal-details">
                <h4>{selectedImage.title}</h4>
                <p className="modal-description">{selectedImage.description}</p>
                {selectedImage.details && (
                  <div className="details-section">
                    <h5>Behind the Shot</h5>
                    <p>{selectedImage.details}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </HelmetProvider>
  );
};
