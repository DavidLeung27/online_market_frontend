import React from 'react'
import styles from './ProfileFooter.module.css'
import { Link } from 'react-router-dom'

function ProfileFooter() {
  return (
    <div className={styles.profileFooter}>
        <div className={styles.profileFooterBox}>
          <div className={styles.profileFooterBoxTitle}>Call</div>
          <div className={styles.profileFooterBoxContent}>+852 5938 5162</div>
        </div>

        <div className={styles.profileFooterBox}>
          <div className={styles.profileFooterBoxTitle}>Email</div>
          <a href="mailto:leungkwinglok@gmail.com" className={styles.profileFooterBoxContent}>leungkwinglok@gmail.com</a>
        </div>

        <div className={styles.profileFooterBox}>
          <div className={styles.profileFooterBoxTitle}>Follow</div>

          <div className={styles.profileFooterLink}>
            <Link to="https://github.com/DavidLeung27" className={styles.profileIcon} >
              <img src='/img/github.png'  className={styles.profileIcon} alt='github'/>
            </Link>
            <Link to="https://github.com/DavidLeung27" className={styles.profileIcon} >
              <img src='/img/linkedin.png'  className={styles.profileIcon} alt='linkedin'/>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default ProfileFooter