import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta, portfolioCategories } from "../../content_option";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(dataportfolio);
    } else {
      setFilteredItems(
        dataportfolio.filter((item) => item.category === activeCategory)
      );
    }
    
    // Check if there's a selected project from homepage
    const selectedProjectId = localStorage.getItem('selectedProjectId');
    if (selectedProjectId) {
      // Find the project by id or index
      const project = dataportfolio.find(
        (item) => item.id === selectedProjectId || 
        dataportfolio.indexOf(item) === parseInt(selectedProjectId)
      );
      
      if (project) {
        // Open the modal with this project
        setTimeout(() => {
          openModal(project);
          // Clear the localStorage item to avoid reopening on refresh
          localStorage.removeItem('selectedProjectId');
        }, 500);
      }
    }
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    // Extract video ID from different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
      : null;
  };

  return (
    <>
      <Helmet>
        <title>Portfolio - George Kelly</title>
        <meta name="description" content="Portfolio - George Kelly's Work" />
      </Helmet>
      <Container className="portfolio-container">
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="12">
            <h1 className="section_title">Filmography</h1>
          </Col>
        </Row>

        <div className="portfolio-categories">
          {portfolioCategories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${
                activeCategory === category.value ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <TransitionGroup className="portfolio-grid">
          {filteredItems.map((data, i) => {
            return (
              <CSSTransition key={i} timeout={500} classNames="item">
                <div className="po_item" onClick={() => openModal(data)}>
                  <img src={data.img} alt={data.title} />
                  <div className="content">
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                    <span className="view-project">Watch Video</span>
                  </div>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>

        {isModalOpen && selectedItem && (
          <div className="portfolio-modal" onClick={(e) => {
            if (e.target.className === 'portfolio-modal') {
              closeModal();
            }
          }}>
            <div className="modal-backdrop" onClick={closeModal}></div>
            <div className="modal-content">
              <button className="close-modal" onClick={closeModal} aria-label="Close modal">
                ×
              </button>
              
              {selectedItem.link && selectedItem.link.includes("youtube.com") ? (
                <>
                  <div className="modal-video">
                    <iframe
                      src={getYouTubeEmbedUrl(selectedItem.link)}
                      title={selectedItem.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="modal-details">
                    <div>
                      <div className="modal-info-container">
                        <span className="category-tag">{selectedItem.category}</span>
                        <div>
                          <h2>{selectedItem.title}</h2>
                          <p>{selectedItem.description}</p>
                        </div>
                      </div>
                      
                      <div className="modal-actions">
                        <a 
                          href={selectedItem.link} 
                          className="btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-image">
                    <img src={selectedItem.img} alt={selectedItem.title} />
                  </div>
                  
                  <div className="modal-details">
                    <div>
                      <div className="modal-info-container">
                        <span className="category-tag">{selectedItem.category}</span>
                        <div>
                          <h2>{selectedItem.title}</h2>
                          <p>{selectedItem.description}</p>
                        </div>
                      </div>
                      
                      <div className="modal-actions">
                        {selectedItem.link && (
                          <a 
                            href={selectedItem.link} 
                            className="btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedItem.link.includes("amazon") ? "View on Amazon" : "Watch Video"}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
