import React, { useState } from 'react'
import styles from './LoginPage.module.css'
import { Link, useNavigate } from 'react-router-dom';
import LoginByGoogle from './LoginByGoogle';
import { BackEnd_API_URL, validInput, validInputMessage } from '../global/constants';
import CustomForm from '../../component/CustomForm';

export default function LoginPage() {
  const [phoneLogin, setPhoneLogin] = useState(1);

  let navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    countryCode: '+852',
    phoneNumber: '',
    email: '',
    username: '',
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
    }

    fetch(BackEnd_API_URL + '/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitForm)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if(data.code == 0) {
        return;
      }

      localStorage.setItem("accessToken", data.data)
      window.location = "/";
    })
  }

  
  return (

    <div className='page'>

      <CustomForm setElement={setFormData}>
        <h2>Login</h2>
        
        <form className='form' onSubmit={submitLoginForm}>

          <div className={styles.loginMethodContainer}>
            <button className={styles.loginMethod} onClick = {() => {if(!phoneLogin) {changeLoginMethod()}}} type="button" id="button_phoneLogin">Phone Number</button>
            <button className={styles.loginMethod} onClick = {() => {if(phoneLogin) {changeLoginMethod()}}} type="button" id="button_emailLogin">Email Address</button>
          </div>
          

          {phoneLogin ? (
            <div id="Login by Phone" className={styles.phoneLogin}>

              <select className={styles.countryCode} id="Country Code" name="countryCode"> 
                <option value="+852">+852</option>
                <option value="+886">+000</option> 
              </select>

              <input 
                id="LoginPhone" 
                type="tel" 
                name="phoneNumber" 
                placeholder="Phone Number"
                pattern={validInput.numOnly}
                title={validInputMessage.numOnly}
                required 
              />
              
            </div>
          ) : (

            <div id="Login by Email">
              
              <input 
                id="LoginEmail" 
                type="text" 
                name="email" 
                placeholder="Email address"
                pattern={validInput.email}
                title={validInputMessage.email}
                required
              />
              
            </div>

          )}
          
          <div>
            
            <input 
              id="LoginPassword" 
              type="password" 
              name="password" 
              placeholder="Password"
              pattern={validInput.all}
              title={validInputMessage.all}
              required 
            />
            
          </div>

          <input type='submit' className='btnInput' id="Login" value='Login'/>

          <div className={styles.OAuth2Login_SignUp}>
            <LoginByGoogle/>
            
            <Link to='/signup' className={styles.signUpLink}>SignUp</Link>
          </div>

        </form>
      </CustomForm>    
    </div>

  )
}
