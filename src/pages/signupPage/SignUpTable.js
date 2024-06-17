import React, { useEffect, useRef, useState } from 'react'
import { BackEnd_API_URL, validInput, validInputMessage } from '../global/constants';
import CustomForm from '../../component/CustomForm';
import { useNavigate } from 'react-router-dom';

function SignUpTable() {
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


    fetch(BackEnd_API_URL + '/signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitForm)

    }).then((response) => {
      return response.json();

    }).then((data) => {
      if (data.code == 1) {
        setACExists({code: 0});
        window.location = "/login";
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

        <div>
          <button type='button' onClick = {() => {if(!phoneSignUp) {changeSignUpMethod()}}} id="button_phoneLogin">Phone Number</button>
          <button type='button' onClick = {() => {if(phoneSignUp) {changeSignUpMethod()}}} id="button_emailLogin">Email Address</button>
        </div>

        { phoneSignUp ? (
          <>
            <label htmlFor='signUpPhone'>Phone Number: *</label>
            <select title='Please select your country code' className="countryCode" id="Country Code" name="countryCode"> 
              <option value='+852'>+852</option>
              <option value='+886'>+886</option> 
            </select>

            <input 
              className="phoneInput" 
              id="signUpPhone" 
              type="tel" 
              name="phoneNumber" 
              pattern={validInput.phoneNumber} 
              title={validInputMessage.phoneNumber}
              required/>
          </>
        ) : (
          <>
            <label htmlFor='signUpEmail'>Email: *</label>
            <input 
              className="emailOrUserInput" 
              id="signUpEmail" 
              type="email" 
              name="email"
              pattern={validInput.email}
              title={validInputMessage.email} 
              required
            />
          </>
        )}
        
        <label htmlFor='signUpPassword'>Password: *</label>
        <input 
          id="signUpPassword" 
          type="password" 
          name="password" 
          pattern={validInput.all} 
          title={validInputMessage.all}
          required 
        />
        
        <label htmlFor='signUpUsername'>Username: *</label>
        <input 
          id="signUpUsername" 
          type="text" 
          name="username" 
          pattern={validInput.all} 
          title={validInputMessage.all} 
          required 
        />
        
        <label htmlFor='signUpFirstName'>First Name: *</label>
        <input 
          id="signUpFirstName" 
          type="text" 
          name="firstName" 
          pattern={validInput.charOnly} 
          title={validInputMessage.charOnly} 
          required 
        />
        
        <label htmlFor='signUpLastName'>Last Name: *</label>
        <input 
          id="signUpLastName" 
          type="text" 
          name="lastName" 
          pattern={validInput.charOnly} 
          title={validInputMessage.charOnly}
          required 
        />

        {/* <label htmlFor='address'>Address: *</label>
        <input 
          id="signUpAddress" 
          type="text" 
          name="address" 
          pattern={validInput.charOnly} 
          title={validInputMessage.charOnly}
          required 
        /> */}

        <input type='submit' className='btnInput' value='Sign Up'/>

        { acExists.code == '0' &&
          <div>{acExists.msg}</div>
        }

      </form>
      
    </CustomForm>
  )
}

export default SignUpTable