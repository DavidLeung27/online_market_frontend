import React, { useState } from 'react'
import styles from './ProjectContainer.module.css'
import { Link } from 'react-router-dom'

function ProjectContainer() {

    const [dropDown, setDropDown] = useState(false);

  return (
    <div className={styles.projectContainer}>
        <Link to="/online-market" className={styles.projectNav}>
            <div className={styles.projectContenct}>
                <div className={styles.projectTitle}>Online Market &gt;&gt; </div>
                {/* <div className={styles.projectContent}>
                    This project is my first project. It is develop by:
                </div> */}

                <ls>
                    <li className={styles.projectContentPoint}>
                        Implemented sign-up, login, and product upload functionalities 
                        to demonstrate backend and database integration. 
                    </li>
                    <li className={styles.projectContentPoint}>
                        Included OAuth 2.0 and JWT for secure login.
                    </li>
                    <li className={styles.projectContentPoint}>
                        Integrated Lucene search functionality for product searches.
                    </li>
                </ls>

            </div>

            <img src='./img/logo.png' alt='marketLogo' className={styles.projectLogo}/>

        </Link>

        <div className={styles.projectDropDown} onClick={() => setDropDown(!dropDown)}>
            
            {!dropDown && <>&#65086;</>}
            {
                dropDown && 
                <>
                    &#65085;
                    <div className={styles.projectDropDownContent}>
                        <div className={styles.languageImgDescription}>
                            <img src='./img/react.png' alt='react' className={styles.languageImg}/>
                            Frontend
                        </div>
                        <div className={styles.plus}>+</div>
                        <div className={styles.languageImgDescription}>
                            <img src='./img/springboot.png' alt='springboot' className={styles.languageImg}/>
                            Backend
                        </div>
                        <div className={styles.plus}>+</div>
                        <div className={styles.languageImgDescription}>
                            <img src='./img/mysql.png' alt='mysql' className={styles.languageImg}/>
                            Database
                        </div>
                        <div className={styles.plus}> </div>
                        <div className={styles.languageImgDescription}>
                            <img src='./img/aws_ec2.png' alt='aws_ec2' className={styles.languageImg}/>
                            Hosted by
                        </div>
                        
                    </div>
                </>
            }
        </div>

    </div>
  )
}

export default ProjectContainer