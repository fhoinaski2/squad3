import React, { useEffect, useRef } from 'react';
import styles from './Loading_Snipper.module.css';
import Typed from 'typed.js';

const LoadingSpinner = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['Verificando...', 'Aguarde um momento...'], 
      typeSpeed: 100, 
      backSpeed: 100, 
      loop: true, 
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className={styles.loadingSpinner}>
      <p ref={typedRef}></p>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
