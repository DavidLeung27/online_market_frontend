import { Link } from 'react-router-dom';
import React from 'react'
import styles from './Header.module.css'
import SearchBar from './SearchBar';
import NavLogin from './NavLogin';
import NavProductDrop from './NavProductDrop';

export default function () {

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.imgContainer}>
        <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt='logo' className={styles.logo}/>
      </Link>

      <SearchBar/>

      <NavProductDrop/>

      <NavLogin/>
      
    </div>
  )
}
