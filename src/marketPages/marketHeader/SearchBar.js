import React, { useEffect, useRef, useState } from 'react'
// import styles from './MarketHeader.module.css'
import styles from './SearchBar.module.css'
import { Link } from 'react-router-dom';

function SearchBar() {
  const BackEnd_API = process.env.REACT_APP_BACKEND_API;

  const inputRef = useRef(null);

  const [searchVal, setSearchVal] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [noOfSearchResult, setNoOfSearchResult] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputChangeHandler = e => {
    setSearchVal(e.target.value);
    searchHandler(e);
  }

  const keyDownHandler = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(selectedIndex == noOfSearchResult - 1 ? noOfSearchResult - 1 : selectedIndex + 1);
      return ;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(selectedIndex == -1 ? -1 : selectedIndex - 1);
      return ;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex == -1) {
        window.location = ('/product?productName=' + searchVal + '&page=1');
      } else {
        window.location = ('/product?productName=' + searchResult[selectedIndex] + '&page=1');
      }
    }

    return ;
  }

  const searchHandler = e => {
    const searchText = e.target.value;
    fetch(BackEnd_API + '/search?' + new URLSearchParams({
      keyword: searchText
    })).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.data == null) {
        console.log("search return null result");
        return;
      }
      setSearchResult(data.data);
      setNoOfSearchResult(data.data.length);
    }).catch(() => {
      console.log("fail");
    })
  }

  const handleLinkClick = (data) => {
    setSearchVal(data);
    setSearchResult([]);
  }

  return (
    <div className={styles.searchBar}>
      
      <div className={styles.searchDropDown}>
        <input type="text" 
          value={searchVal} 
          onClick={searchHandler} 
          onChange={inputChangeHandler}
          onKeyDown={keyDownHandler} 
          placeholder='Search' 
          className={styles.searchInput}
          ref={inputRef}
        />
        <div className={styles.searchSuggestion}>
          { searchResult.map((data, index) => {
            return (
              <Link 
                to={'/online-market/product?productName=' + data + '&page=1'} 
                onClick={() => handleLinkClick(data)} 
                className={styles.searchItem + ' ' + (index == selectedIndex ? styles.selected : '')} 
                key={index}
              >
                {data}
              </Link>
            )
          })}
        </div>
      </div>
      
      <Link className={styles.searchBtn} to={searchVal == '' ? '/online-market/product?page=1' : '/online-market/product?productName=' + searchVal + '&page=1'}>
        <img src={process.env.PUBLIC_URL + '/img/search.png'} alt='search' className={styles.searchIcon} />
      </Link>
    
    </div>

  )
}

export default SearchBar