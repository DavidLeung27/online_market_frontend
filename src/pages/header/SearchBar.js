import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { BackEnd_API_URL } from '../global/constants';
import { Link } from 'react-router-dom';

function SearchBar() {

  const [searchResult, setSearchResult] = useState([]);
  const [searchVal, setSearchVal] = useState();


  const searchHandler = e => {
    const searchText = e.target.value;
    fetch(BackEnd_API_URL + '/search?' + new URLSearchParams({
      keyword: searchText
    })).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.data == null) {
        console.log("search return null result");
        return;
      }
      setSearchResult(data.data);
    }).catch(() => {
      console.log("fail");
    })
  }

  const handleLinkClick = (data) => {
    setSearchVal(data);
    setSearchResult([]);
  }

  return (
    <form className={styles.searchBar}>
      
      <div className={styles.searchDropDown}>
        <input type="text" value={searchVal} onClick={searchHandler} onChange={searchHandler} placeholder='Search' className={styles.searchInput}/>
        <div className={styles.searchSuggestion}>
          { searchResult.map((data, index) => {
            return (
              <Link to={'/product?productName=' + data + '&page=1'} onClick={() => handleLinkClick(data)} className={styles.searchItem} key={index}>
                {data}
              </Link>
            )
          })}
        </div>
      </div>
      
      <button className={styles.searchBtn}>Search</button>
    
    </form>
  )
}

export default SearchBar