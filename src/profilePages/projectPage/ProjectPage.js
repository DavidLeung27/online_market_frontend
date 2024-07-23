import React from 'react'
import styles from './ProjectPage.module.css'
import ProjectContainer from './ProjectContainer'

function ProjectPage() {
  return (
    <div className='page'>
        <div className={styles.projectPageTitleContainer}>
            <div className={styles.blueDot}></div>
            <div className={styles.projectPageTitle}>Side Project</div>
        </div>

        <ProjectContainer/>

        
    </div>
  )
}

export default ProjectPage