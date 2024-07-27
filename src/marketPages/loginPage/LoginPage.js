import React, { useState } from 'react'
import styles from './LoginPage.module.css'
import { Link, useNavigate } from 'react-router-dom';
import LoginByGoogle from './LoginByGoogle';
import { validInput, validInputMessage } from '../../global/constants';
import CustomForm from '../../component/CustomForm';

export default function LoginPage() {
  const BackEnd_API = process.env.REACT_APP_BACKEND_API;

  const [phoneLogin, setPhoneLogin] = useState(1);
  const [loginFail, setLoginFail] = useState(0);

  // let navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    countryCode: '+852',
    phoneNumber: '',
    email: '',
    // username: '',
    password: ''
  });

  const changeLoginMethod = () => {
    setPhoneLogin(!phoneLogin);
    setFormData(preState => ({
      ...preState,
      email: '',
      phoneNumber: '',
      countryCode: '+852'
    }))
  }
  
  const submitLoginForm = (e) => {
    e.preventDefault();

    let submitForm;

    if(phoneLogin) {

      const{email, ...rest} = formData;
      submitForm = rest;
      submitForm.loginMethod = 'PhoneLogin'
    } else {
      const {countryCode, phoneNumber, ...rest} = formData;
      submitForm = rest;
      submitForm.loginMethod = 'EmailLogin'
    }

    fetch(BackEnd_API + '/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitForm)
    }).then((response) => {
      if(response.status !== 200) {
        throw new Error("login fail");
      }
      return response.json();
    }).then((data) => {
      if(data.code == 0) {
        setLoginFail(1);
        console.log("login fail");
        return;
      }
      console.log("login success");

      localStorage.setItem("accessToken", data.data)
      window.location = "/online-market/";
    }).catch(() => {
      console.log("login fail");
    })
  }

  
  return (

    <div className='page'>

      <CustomForm setElement={setFormData}>
        
        <form className='form' onSubmit={submitLoginForm}>
          <div className={styles.loginTitle}>Login</div>
          <div className={styles.separateLine}></div>

          <div className={styles.loginMethodContainer}>

            <button 
            className={`${styles.loginMethod} ${phoneLogin ? styles.selectedLoginMethod : ''}`} 
            onClick = {() => {if(!phoneLogin) {changeLoginMethod()}}} 
            type="button" 
            id="button_phoneLogin">
              Phone Number
            </button>

            {/* <div className={styles.separateLineLoginMethod}></div> */}

            <button 
            className={`${styles.loginMethod} ${!phoneLogin ? styles.selectedLoginMethod : ''}`} 
            onClick = {() => {if(phoneLogin) {changeLoginMethod()}}} 
            type="button" 
            id="button_emailLogin">
              Email Address
            </button>

          </div>
          

          {phoneLogin ? (
            <div id="Login by Phone" className={styles.inputContainer}>

              <select className={styles.countryCode} id="Country Code" name="countryCode"> 
                <option value="+852">+852</option>
                <option value="+886">+886</option> 
              </select>

              <input 
                id="LoginPhone" 
                className={styles.formInput} 
                type="tel" 
                name="phoneNumber" 
                placeholder="Phone Number"
                pattern={validInput.numOnly}
                title={validInputMessage.numOnly}
                required 
              />
              
            </div>
          ) : (

            <div id="Login by Email" className={styles.inputContainer}>
              
              <input 
                id="LoginEmail" 
                className={styles.formInput} 
                type="text" 
                name="email" 
                placeholder="Email address"
                pattern={validInput.email}
                title={validInputMessage.email}
                required
              />
              
            </div>

          )}
          
          <div className={styles.inputContainer}>
            
            <input 
              id="LoginPassword" 
              className={styles.formInput} 
              type="password" 
              name="password" 
              placeholder="Password"
              pattern={validInput.all}
              title={validInputMessage.all}
              required 
            />
            
          </div>

          <input type='submit' className={styles.loginButton} id="Login" value='Login'/>
          
          {
            loginFail ? <div className={styles.loginFail}>Account is not exist or password incorrect.</div> : null
          }

          <Link to='/online-market/signup' 
          className={styles.signUpLink}>
            SignUp
          </Link>

          <div className={styles.separateLine}></div>


          <div className={styles.OAuth2Login_SignUp}>
            {/* <div className={styles.loginTitle}>LoginBy</div> */}
            <LoginByGoogle className={styles.loginByGoogle}/>
          </div>

        </form>
      </CustomForm>    
    </div>

  )
}
