import React, { useEffect, useRef, useState } from 'react'
import { validInput, validInputMessage } from '../../global/constants';
import CustomForm from '../../component/CustomForm';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpTable.module.css'

function SignUpTable() {
  const BackEnd_API = process.env.REACT_APP_BACKEND_API;

  const navigate = useNavigate();

  const [phoneSignUp, setPhoneSignUp] = useState(1);

  const [formData, setFormData] = useState({
    email: '',
    countryCode: '+852',
    phoneNumber: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [acExists, setACExists] = useState({
    code: 0,
    message: null
  })

  const changeSignUpMethod = () => {
    setPhoneSignUp(!phoneSignUp);
    setFormData(preState => ({
      ...preState,
      email: '',
      phoneNumber: '',
      countryCode: '+852'
    }))
  }

  const submitSignUpForm = (e) => {

    e.preventDefault();

    let submitForm;

    if(phoneSignUp) {
      const {email, ...rest} = formData;
      submitForm = rest;
    } else {
      const {countryCode, phoneNumber, ...rest} = formData;
      submitForm = rest;
    }

    console.log(formData);


    fetch(BackEnd_API + '/signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitForm)

    }).then((response) => {
      return response.json();

    }).then((data) => {
      if (data.code == 1) {
        setACExists({code: 0});
        window.location = "/online-market/login";
        return;
      }

      setACExists(data);

    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    console.log(acExists);
  }, [acExists])

  return (
    <CustomForm setElement={setFormData} >


      <form className='form' onSubmit={submitSignUpForm}>
        <div className={styles.signUpTitle}>SignUp</div>
        <div className={styles.separateLine}></div>

        <div className={styles.signUpMethodContainer}>
          <button 
          className={`${styles.signUpMethod} ${phoneSignUp ? styles.selectedSignUpMethod : ''}`} 
          type='button' 
          onClick = {() => {if(!phoneSignUp) {changeSignUpMethod()}}} 
          id="button_phoneSignUp">
            Phone Number
          </button>

          <button 
          className={`${styles.signUpMethod} ${!phoneSignUp ? styles.selectedSignUpMethod : ''}`} 
          type='button' 
          onClick = {() => {if(phoneSignUp) {changeSignUpMethod()}}} 
          id="button_emailSignUp">
            Email Address
          </button>
        </div>

        { phoneSignUp ? (
          <>
            <label htmlFor='signUpPhone'>Phone Number: *</label>

            <div className={styles.inputContainer}>

              <select title='Please select your country code' className={styles.countryCode} id="Country Code" name="countryCode"> 
                <option value='+852'>+852</option>
                <option value='+886'>+886</option> 
              </select>

              <input 
              className={styles.formInput}
              id="signUpPhone" 
              type="tel" 
              name="phoneNumber" 
              pattern={validInput.phoneNumber} 
              title={validInputMessage.phoneNumber}
              required/>

            </div>
          </>
        ) : (
          <>
            <label htmlFor='signUpEmail'>Email: *</label>

            <div className={styles.inputContainer}>
              <input 
                className={styles.formInput}
                id="signUpEmail" 
                type="email" 
                name="email"
                pattern={validInput.email}
                title={validInputMessage.email} 
                required
              />
            </div>
          </>
        )}
        
        <label htmlFor='signUpPassword'>Password: *</label>
        <div className={styles.inputContainer}>

          <input 
            className={styles.formInput}
            id="signUpPassword" 
            type="password" 
            name="password" 
            pattern={validInput.all} 
            title={validInputMessage.all}
            required 
          />

        </div>
        
        <label htmlFor='signUpUsername'>Username: *</label>
        <div className={styles.inputContainer}>
          <input 
            className={styles.formInput}
            id="signUpUsername" 
            type="text" 
            name="username" 
            pattern={validInput.all} 
            title={validInputMessage.all} 
            required 
          />
        </div>
        
        <label htmlFor='signUpFirstName'>First Name: *</label>
        <div className={styles.inputContainer}>
          <input 

            className={styles.formInput}
            id="signUpFirstName" 
            type="text" 
            name="firstName" 
            pattern={validInput.charOnly} 
            title={validInputMessage.charOnly} 
            required 
          />

        </div>
        
        <label htmlFor='signUpLastName'>Last Name: *</label>
        <div className={styles.inputContainer}>

          <input 

            className={styles.formInput}
            id="signUpLastName" 
            type="text" 
            name="lastName" 
            pattern={validInput.charOnly} 
            title={validInputMessage.charOnly}
            required 
          />
        </div>

        {/* <label htmlFor='address'>Address: *</label>
        <input 
          id="signUpAddress" 
          type="text" 
          name="address" 
          pattern={validInput.charOnly} 
          title={validInputMessage.charOnly}
          required 
        /> */}

        <input type='submit' className={styles.signUpButton} value='Sign Up'/>

        { acExists.code == '0' &&
          <div>{acExists.msg}</div>
        }

      </form>
      
    </CustomForm>
  )
}

export default SignUpTable