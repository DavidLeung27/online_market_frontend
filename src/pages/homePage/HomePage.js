import React from 'react'
import styles from './HomePage.module.css'

export default function HomePage() {

  return (
    <div className="page">
      <h1>Online Market Website</h1>
      <div className={styles.intro}>
        <p>This website is built using React, Spring Boot, and MySQL. It includes the following functionalities:</p>
        <li>Upload a product: </li>
        <p className={styles.description}> - Accessible on the /upload page.</p>
        <li>View all products: </li>
        <p className={styles.description}> - Available on the /product page.</p>
        <li>Search for products by name: </li>
        <p className={styles.description}> - Search bar located in the header, utilizing Apache Lucene for full-text and fuzzy searching.</p>
        <li>Sign up: </li>
        <p className={styles.description}> - Registration form located on the /signup page.</p>
        <li>Login: </li>
        <p className={styles.description}> - Authentication form available on the /login page, with JWT/OAuth2 functionalities.</p>
        <li>Return to the home page: </li>
        <p className={styles.description}> - Click the logo in the header to navigate back to the home page.</p>
      </div>
    </div>
  )
}
