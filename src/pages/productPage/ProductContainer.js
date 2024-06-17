import React, { useEffect, useState } from 'react'
import ProductPreview from './ProductPreview'
import { useLocation } from 'react-router-dom';
import styles from './ProductContainer.module.css'
import PageButton from '../../component/PageButton';
import { BackEnd_API_URL } from '../global/constants';

export default function ProductContainer() {
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);

  const paramsName = [
    'productName',
    'category',
    'page'
  ]

  const params = {};

  const GetParams = () => {
    paramsName.forEach(key => {

      const value = searchParams.get(key);

      if(value!=null) {
        params[key] = value;
      }
    });
  }

  GetParams();

  const pageNumber = parseInt(params.page);

  const [urlFormat, setUrlFormat] = useState(1);
  
  const [lastPageNumber, setLastPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  const [componentArray, setCompnentArray] = useState([]);
  const [pageButtonArray, setPageButtonArray] = useState([]);

  useEffect(() => {
    if (params.page == undefined || params.page < 1) {
      setUrlFormat(0)
      return;
    }
    setUrlFormat(1);

    fetch(BackEnd_API_URL + '/product/v2?' + new URLSearchParams({
      ...params,
      pageSize: pageSize
    }))
    .then(response => {
      return response.json();
    }).then((result) => {

      return result.data;
    }).then((data) => {
      
      setLastPageNumber(data.noOfPage);
      
      setCompnentArray(data.searchProduct); 
    }).catch(() => {
      console.log("error on get request");
    })
  }, [search])

  useEffect(() => {
    setPageButtonArray(generatePageButtonArray());
    if(pageNumber > lastPageNumber) {
      setUrlFormat(0);
    }
  }, [lastPageNumber, pageNumber])

  const generatePageButtonArray = () => {
    var previousPage = { content: '<', btnParam: {...params, page: pageNumber - 1}};
    var nextPage = { content: '>', btnParam: {...params, page: pageNumber + 1}};
    const pageButtonDot = { content: '...', btnParam: {...params, page: pageNumber},  clickable: false };
    const firstPage = { content: 1, btnParam: {...params, page: 1}, clickable: true };
    const lastPage = { content: lastPageNumber, btnParam: {...params, page: lastPageNumber}, clickable: true };

    var pageButtonArrayTemp = [];

    if (pageNumber != 1) {
      previousPage.clickable = true;
    } else {
      previousPage.clickable = false;
    }

    pageButtonArrayTemp.push(previousPage);

    if (pageNumber - 2 > 1) {
      pageButtonArrayTemp.push(firstPage);
    }

    if (pageNumber - 3 > 1) {
      pageButtonArrayTemp.push(pageButtonDot);
    }

    for (let index = 0; index < 5; index ++) {
      const content = pageNumber - 2 + index;
      const btnParam = {
        ...params,
        page: content
      }
      const clickable = content !== pageNumber;
      if (content >= 1 && content <= lastPageNumber) {
        pageButtonArrayTemp.push({content, btnParam, clickable});
      }
    }

    if (pageNumber + 3 < lastPageNumber) {
      pageButtonArrayTemp.push(pageButtonDot);
    }

    if (pageNumber + 2 < lastPageNumber) {
      pageButtonArrayTemp.push(lastPage);
    }

    if (pageNumber != lastPageNumber) {
      nextPage.clickable = true;
    } else {
      nextPage.clickable = false;
    }

    pageButtonArrayTemp.push(nextPage);

    return pageButtonArrayTemp;
  }

  return (
    <>
      <div className={styles.productContainer}>
        { !urlFormat && 
          <div>No Result.</div>
        }
        <div className={styles.productGrid}>

          { componentArray.map((item, index) => (
            <ProductPreview key={index} id={item.product_id} image={item.image} productName={item.productName} price={item.price} />
          ))}
        </div>
        <div className={styles.pageButtonContainer}>

          { pageButtonArray.map((item, index) => (
            <PageButton key={index} params={item.btnParam} content={item.content} clickable={item.clickable} />
          ))}
        </div>
      </div>
    </>
  )
}
