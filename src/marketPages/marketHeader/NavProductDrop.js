import { Link } from 'react-router-dom';
import React from 'react'
import styles from './MarketHeader.module.css'

function NavProductDrop() {

  return (
    <div className={styles.dropDown}>
      <button type='button' className={styles.dropDownBtn}>
        Product&#9662;
      </button>

      <div className={styles.dropDownContent}>

        <Link to="/online-market/product?page=1" className={styles.dropDownItem}>
          <span className={styles.headerBtnText}>
            View Product
          </span>
        </Link>

        <Link to="/online-market/upload" className={styles.dropDownItem}>
          <span className={styles.headerBtnText}>
            Upload Product
          </span>
        </Link>

      </div>

    </div>
  )
}

export default NavProductDrop