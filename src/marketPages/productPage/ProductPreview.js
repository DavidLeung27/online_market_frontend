import React, { useEffect, useState } from 'react'
import styles from './ProductPreview.module.css'

export default function ProductPreview({ id, image, productName, price }) {
  const productId = id;

  return (
    <span className={styles.productBox}>
      <div className={styles.imageContainer}>
        <img className={styles.productImage} src={`data:image/jpeg;base64,${image}`} alt="Base64 Image" />
      </div>
      <div className={styles.productInfoContainer}>
        <p id='productName'>{productName}</p>
        <p id='price'>$ {price}</p>
      </div>
      <button>Add to Cart</button>
    </span> 
  )
}
