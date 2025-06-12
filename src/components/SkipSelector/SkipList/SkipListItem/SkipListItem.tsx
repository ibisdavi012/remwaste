import React from 'react';
import styles from './SkipListItem.module.scss';
import type { Skip } from '../../../../utils/sortUtils';
import { useImageLoader } from '../../../../hooks/useImageLoader';
import ImageLoader from '../../../ImageLoader/ImageLoader';

interface SkipListItemProps {
  skip: Skip;
  selected: boolean;
  onClick: () => void;
}

const SkipListItem: React.FC<SkipListItemProps> = ({ skip, selected, onClick }) => {
  const { imgSrc, isLoading } = useImageLoader(skip.size);

  return (
    <div
      className={`${styles.item} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={selected}
    >
      <div className={styles.imageContainer}>
        <ImageLoader isLoading={isLoading}>
          <img
            src={imgSrc}
            alt={`${skip.name} - ${skip.size}`}
            className={styles.image}
          />
        </ImageLoader>
      </div>
      <div className={styles.textBlock}>
        <div className={styles.title}>{`${skip.size} Yard Skip`}</div>
        <div className={styles.subtitle}>{`${skip.hire_period_days} day hire period`}</div>
      </div>
      <div className={styles.priceBlock}>
        <span className={styles.price}>£{skip.price_before_vat}</span>
      </div>
      <div className={styles.tags}>
        {!skip.allowed_on_road && (
          <span className={`${styles.tag} ${styles.notAllowed}`}>Not allowed on road</span>
        )}
        {skip.allows_heavy_waste && (
          <span className={`${styles.tag} ${styles.heavyWaste}`}>Allows heavy waste</span>
        )}
      </div>
    </div>
  );
};

export default SkipListItem; 