import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './ProfileHeader.module.css'

function ProfileHeader() {
  const location = useLocation();

  return (
    <div className={styles.profileHeader}>
      <div className={styles.headerLeft}>
        <div className={styles.blueDot}></div>
        <Link to="/" className={styles.homePageBtn}>David Leung</Link>
      </div>
      <div className={styles.headerRight}>
        <Link to="/" className={`${styles.navBtn} ${location.pathname === '/' ? styles.active : ''}`}>ABOUT ME</Link>
        {/* <Link to="/resume" className={`${styles.navBtn} ${location.pathname === '/resume' ? styles.active : ''}`}>RESUME</Link> */}
        <a className={styles.navBtn} href='/pdf/CV.pdf'  target="_blank">RESUME</a>
        <Link to="/project" className={`${styles.navBtn} ${location.pathname === '/project' ? styles.active : ''}`}>PROJECT</Link>
        {/* <Link to="/contact" className={`${styles.navBtn} ${location.pathname === '/contact' ? styles.active : ''}`}>CONTACT</Link> */}
      </div>
    </div>
  )
}

export default ProfileHeader