import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { BackEnd_API_URL } from '../global/constants';

function NavLogin() {
  const [loggedIn, setloggedIn] = useState(0);

  useEffect(() => {

    const token = localStorage.getItem('accessToken');
    
    if (token === null) {
      setloggedIn(0);
      return;
    }

    fetch(BackEnd_API_URL + '/login/jwtChecker', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Jwt': token
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
    console.log(data);
    if(data.code == 1) {
      setloggedIn(1);
      localStorage.setItem("accessToken", data.data);
    }
    else {
      setloggedIn(0);
      localStorage.removeItem('accessToken');
      console.log(data.msg);
    }
    }).catch(() => {
      console.log("jwt Check fail");
    })

  }, []);

  return (
    <>
      {(!loggedIn && (
        <Link to="/login"  className={styles.loginNav}>
          <span className={styles.headerBtnText}>Login</span>
        </Link>
      )) || (
        <Link to="/profile"  className={styles.profileNav}>
          <img src={process.env.PUBLIC_URL + '/img/user.png'} alt='userLogo' className={styles.userLogo}/>
        </Link>
      )}
    </>
  )
}

export default NavLogin