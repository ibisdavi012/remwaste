import React from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  onBack: () => void;
  onContinue: () => void;
  continueDisabled: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBack, onContinue, continueDisabled }) => {
  return (
    <div className={styles.header}>
      <button className={`${styles.button} ${styles.back}`} onClick={onBack}>
        <span className={styles.backText}>Back</span>
      </button>
      <div className={styles.stepper}>
        <span className={styles.step}>Waste Type</span>
        <span className={`${styles.step} ${styles.current}`}>Select Skip</span>
        <span className={styles.step}>Permit Check</span>
      </div>
      <button className={styles.button} onClick={onContinue} disabled={continueDisabled}>
        Continue
      </button>
    </div>
  );
};

export default Header; 