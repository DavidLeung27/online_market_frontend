import React from 'react'
import styles from './HomePage.module.css'
import { Link } from 'react-router-dom'

export default function HomePage() {

  return (
    <div className={styles.home}>
      <div className="page">

        <div className={styles.profile}>


          <div className={styles.profileCard}>

            <img src='/img/logo.png' className={styles.profileImg} alt='profileImg'/>
            <h2 className={styles.profileName}>
              David Leung
            </h2>

            <div className={styles.profileLinks}>
              <Link to="https://github.com/DavidLeung27" className={styles.profileIcon} >
                <img src='/img/github.png'  className={styles.profileIcon} alt='github'/>
              </Link>
              <Link to="https://github.com/DavidLeung27" className={styles.profileIcon} >
                <img src='/img/linkedin.png'  className={styles.profileIcon} alt='linkedin'/>
              </Link>
            </div>

          </div>

          <div className={styles.profileDescription}>
            <div className={styles.profileTitle}>
              Hello
            </div>

            <div className={styles.profileSubTitle}>
              Here's who I am & what I do
            </div>

            <div className={styles.profileNav}>

              <a className={styles.profileResumeDownload} href='/pdf/CV.pdf'  target="_blank">
                Resume
                {/* <img src='/img/downloadIcon.png'  className={styles.profileIcon} alt='download'/> */}
              </a>
              <Link to={'/project'} className={styles.profileProjectNav}>Project</Link>

            </div>


            <div className={styles.profileText}>
              I am a graduate student of Electrical Engineering. 
              After years of experience in the engineering field, 
              I decided to pivot to the IT industry, driven by my passion for technology and innovation. 
              Over the past year, I have dedicated myself to learning programming. 
              To demonstrate my skills, I have developed a web application by
              using React, Java Spring Boot, and MySQL.
            </div>
          </div>

          
        </div>

      </div>
    </div>
  )
}
