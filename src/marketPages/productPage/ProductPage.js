import React from 'react'
import ProductContainer from './ProductContainer'
import styles from './ProductPage.module.css'

export default function () {
  return (
    <div className={`page ${styles.productPage}`}>
      {/* <div className={styles.filter}>
          
      </div> */}
      <ProductContainer/>
    </div>
  )
}
