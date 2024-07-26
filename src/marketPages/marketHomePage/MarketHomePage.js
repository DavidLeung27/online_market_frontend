import React, { useEffect, useState } from 'react'
import styles from './MarketHomePage.module.css'
import FadeImage from './FadeImage';
import Gimmick from './Gimmick';

function MarketHomePage() {

  return (
    <div className='page'>
      <FadeImage/>

      <Gimmick/>

    </div>
  )
}

export default MarketHomePage