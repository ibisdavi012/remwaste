import React from 'react';
import styles from './SkipList.module.scss';
import SkipListItem from './SkipListItem/SkipListItem';
import type { Skip } from '../../../utils/sortUtils';

type SortOption = 'price_asc' | 'price_desc' | 'size_asc' | 'size_desc';

interface SkipListProps {
  skips: Skip[];
  selectedId: number | null;
  onSelect: (skip: Skip) => void;
  sortOption: SortOption;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SkipList: React.FC<SkipListProps> = ({ skips, selectedId, onSelect, sortOption, onSortChange }) => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.headerRow}>
        <div className={styles.titles}>
          <div className={styles.mainTitle}>Choose Your Skip Size</div>
          <div className={styles.subTitle}>Select the skip size that best suits your needs</div>
        </div>
        <div className={styles.sortBar}>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" className={styles.combobox} value={sortOption} onChange={onSortChange}>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="size_asc">Size: Small to Large</option>
            <option value="size_desc">Size: Large to Small</option>
          </select>
        </div>
      </div>
      <div className={styles.scrollList}>
        {skips.map((skip) => (
          <SkipListItem
            key={skip.id}
            skip={skip}
            selected={skip.id === selectedId}
            onClick={() => onSelect(skip)}
          />
        ))}
      </div>
    </div>
  );
};

export default SkipList; 