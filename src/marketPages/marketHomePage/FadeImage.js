import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './FadeImage.module.css'

function FadeImage() {

    const images = [
    "/img/market_poster/electronic_product.jpg",
    "/img/market_poster/fruit.jpg",
    "/img/market_poster/skin_care.jpg"
    ]

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {

    const interval = setInterval(() => {
        setFadeIn(false);
        setFadeOut(true);
        
        
        setTimeout(() => {
        setFadeIn(true);
        setFadeOut(false);
        setCurrentImageIndex((prevIndex) => {
            return (prevIndex + 1) % images.length;
        })


        }, 250);
        
    }, 4000);

    
    return () => clearInterval(interval);

    }, [images.length]);

  return (
    <div className={styles.fadeImageContainer}>
        <img 
          src={images[currentImageIndex]} 
          alt='image'
          className={`${styles.fadeImage} ${fadeOut ? styles.fadeOut : ''} ${fadeIn ? styles.fadeIn : ''}`}
        />

        <div className={styles.slogan}>
          <div className={styles.sloganTitle}>
            One-Stop Shop
          </div>

          <div className={styles.sloganContent}>
            <span className={styles.sloganBreak}>for Freshness, Quality, and</span>
            <span className={styles.sloganBreak}>Everyday Savings</span>
          </div>

          <div className={styles.sloganContent2}>
            Let's view trending products
          </div>

          <Link to="/online-market/product?page=1" className={styles.shopNowBtn}>
            Shop now
          </Link>
        </div>

      </div>
  )
}

export default FadeImage