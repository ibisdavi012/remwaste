import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './SkipSelector.module.scss';
import Header from './Header/Header';
import SkipList from './SkipList/SkipList';
import SkipDetails from './SkipDetails/SkipDetails';
import Loader from './Loader/Loader';
import ImageryWarning from './ImageryWarning/ImageryWarning';
import ImageLoader from '../ImageLoader/ImageLoader';
import { fetchSkips } from '../../api/skipsApi';
import { sortSkips, Skip } from '../../utils/sortUtils';
import { useSkipSelection } from '../../context/SkipSelectionContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useImageLoader } from '../../hooks/useImageLoader';

const POSTCODE = 'NR32';
const AREA = 'Lowestoft';

type SortOption = 'price_asc' | 'price_desc' | 'size_asc' | 'size_desc';

const SkipSelector: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('price_asc');
  const { selectedSkip, setSelectedSkip } = useSkipSelection();
  const isMobile = useMediaQuery('(max-width: 900px)');

  const { imgSrc: footerImgSrc, isLoading: isFooterImageLoading } = useImageLoader(selectedSkip?.size || 0);

  const loadSkips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSkips(POSTCODE, AREA);
      setSkips(data);
    } catch (err: any) {
      setError('Failed to load skip options. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSkips();
  }, [loadSkips]);

  const sortedSkips = useMemo(() => 
    sortSkips(skips, sortOption),
    [skips, sortOption]
  );

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  }, []);

  const handleSelect = useCallback((skip: Skip) => {
    if (selectedSkip?.id === skip.id) {
      setSelectedSkip(null);
    } else {
      setSelectedSkip(skip);
    }
  }, [selectedSkip, setSelectedSkip]);

  const handleBack = useCallback(() => {
    // Implement navigation to previous step
  }, []);

  const handleContinue = useCallback(() => {
    // Implement navigation to next step
  }, []);

  return (
    <div>
      <Header
        onBack={handleBack}
        onContinue={handleContinue}
        continueDisabled={!selectedSkip || loading || !!error}
      />
      <ImageryWarning />
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          {loading ? (
            <Loader />
          ) : error ? (
            <div style={{ color: 'red', padding: '2rem' }}>{error}</div>
          ) : (
            <SkipList
              skips={sortedSkips}
              selectedId={selectedSkip?.id || null}
              onSelect={handleSelect}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          )}
        </div>
        {/* Footer for mobile, details panel for desktop */}
        {isMobile ? (
          <div className={`${styles.rightPanel} ${!selectedSkip ? styles.noSelection : ''}`}>
            {selectedSkip && (
              <>
                <div className={styles.mobileFooter}>
                  <ImageLoader isLoading={isFooterImageLoading} alt="Skip Hire Footer">
                    <img
                      src={footerImgSrc}
                      alt="Skip Hire Footer"
                      className={styles.footerImage}
                    />
                  </ImageLoader>
                </div>
                <div className={styles.footerDetails}>
                  <div className={styles.footerTitle}>{`${selectedSkip.size} Yard Skip`}</div>
                  <div className={styles.footerSubtitle}>{`${selectedSkip.hire_period_days} day hire period`}</div>
                </div>
                <div className={styles.footerPriceBlock}>
                  <span className={styles.footerPrice}>£{selectedSkip.price_before_vat}</span>
                  <span className={styles.footerPerDay}>per day</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={`${styles.rightPanel} ${!selectedSkip ? styles.noSelection : ''}`}>
            {selectedSkip ? (
              <SkipDetails skip={selectedSkip} />
            ) : (
              <p className={styles.noSelectionMessage}>
                Please, select an item from the list on the left.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipSelector; 