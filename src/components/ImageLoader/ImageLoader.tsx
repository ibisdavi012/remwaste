import React, { useState } from 'react';
import styles from './ImageLoader.module.scss';

interface ImageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  alt: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ isLoading, children, alt }) => {
  const [isError, setIsError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsError(true);
    e.currentTarget.style.display = 'none';
  };

  return (
    <div className={styles.container}>
      {React.cloneElement(children as React.ReactElement, {
        onError: handleError
      })}
      {isLoading && !isError && (
        <div className={styles.loaderOverlay}>
          <div className={styles.spinner} />
        </div>
      )}
      {isError && (
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>🚛</div>
          <div className={styles.placeholderText}>{alt}</div>
        </div>
      )}
    </div>
  );
};

export default ImageLoader; 