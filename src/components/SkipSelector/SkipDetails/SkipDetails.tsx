import React from 'react';
import styles from './SkipDetails.module.scss';
import type { Skip } from '../../../utils/sortUtils';
import { useImageLoader } from '../../../hooks/useImageLoader';
import ImageLoader from '../../ImageLoader/ImageLoader';

interface SkipDetailsProps {
  skip: Skip | null;
}

const SkipDetails: React.FC<SkipDetailsProps> = ({ skip }) => {
  const { imgSrc, isLoading } = useImageLoader(skip?.size || 0);

  if (!skip) return null;
  
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.imageContainer}>
        <ImageLoader isLoading={isLoading} alt={`${skip.size} Yard Skip`}>
          <img
            src={imgSrc}
            alt={`${skip.size} Yard Skip`}
            className={styles.image}
          />
        </ImageLoader>
      </div>
      <div className={styles.title}>{`${skip.size} Yard Skip`}</div>
      <div className={styles.subtitle}>{`${skip.hire_period_days} day hire period`}</div>
      <div className={styles.price}>£{skip.price_before_vat}</div>
      <div className={styles.info}>
        {skip.transport_cost !== null && (
          <div><span className={styles.label}>Transport Cost:</span> <span className={styles.value}>£{skip.transport_cost}</span></div>
        )}
        {skip.per_tonne_cost !== null && (
          <div><span className={styles.label}>Per Tonne Cost:</span> <span className={styles.value}>£{skip.per_tonne_cost}</span></div>
        )}
      </div>
    </div>
  );
};

export default SkipDetails; 