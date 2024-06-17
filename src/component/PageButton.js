import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PageButton.module.css'
import classNames from 'classnames';

export default function PageButton({params, content, clickable}) {
    const classDeterminerForSpan = classNames({
        [styles.prevPageButton]: content === '<',
        [styles.nextPageButton]: content === '>',
        [styles.pageButton]: content !== '<' && content !== '>',
        [styles.currentPage]: params.page === content,
    });
    
    const classDeterminerForLink = classNames({
        [styles.prevPageButton]: content === '<',
        [styles.nextPageButton]: content === '>',
        [styles.pageButton]: content !== '<' && content !== '>',
        [styles.clickable]: true,
    });


  return (
    <>
        { !clickable &&
            <span className={classDeterminerForSpan}>
                {content}
            </span>
        }
        { clickable &&
            <Link className={classDeterminerForLink} to={'/product?' + new URLSearchParams(params)}>
                {content}
            </Link>
        }
    </>
  )
}
