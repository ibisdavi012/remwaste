import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loader; 