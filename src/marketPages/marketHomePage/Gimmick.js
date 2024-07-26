import React from 'react'
import styles from './Gimmick.module.css'

function Gimmick() {
  return (
    <div className={styles.gimmickContainer}>
        
        <div className={`${styles.gimmickItem} ${styles.gimmickItem1}`}>
          <img src='/img/market_gimmick/delivery.png' className={styles.gimmickImg} alt='delivery'/>
          <div className={styles.gimmickTitle}>
            Free delivery
          </div>
        </div>

        <div className={`${styles.gimmickItem} ${styles.gimmickItem2}`}>
          <img src='/img/market_gimmick/return.png' className={styles.gimmickImg} alt='return'/>
          <div className={styles.gimmickTitle}>
            Free return
          </div>
        </div>

        <div className={`${styles.gimmickItem} ${styles.gimmickItem3}`}>
          <img src='/img/market_gimmick/online_support.png' className={styles.gimmickImg}  alt='online_support'/>
          <span className={styles.gimmickTitle}>
            24hr online support
          </span>
        </div>

        <div className={`${styles.gimmickItem} ${styles.gimmickItem4}`}>
          <img src='/img/market_gimmick/discount.png' className={styles.gimmickImg} alt='discount'/>
          <div className={styles.gimmickTitle}>
            Weekly Wednesday Deals
          </div>
        </div>

      </div>
  )
}

export default Gimmick