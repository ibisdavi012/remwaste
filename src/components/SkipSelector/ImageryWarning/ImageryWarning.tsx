import React, { useState, useEffect } from 'react';
import styles from './ImageryWarning.module.scss';

const ImageryWarning: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // Match the transition duration in CSS
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Match the transition duration in CSS
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.warningContainer} ${isFading ? styles.fading : ''}`}>
      <p className={styles.warningText}>
        Imagery and information shown throughout this website may not reflect the exact shape or size 
        specification, colours may vary, options and/or accessories may be featured at additional cost.
      </p>
      <button 
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Close warning"
      >
        ×
      </button>
    </div>
  );
};

export default ImageryWarning; 