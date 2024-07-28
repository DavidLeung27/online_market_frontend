import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import React from 'react'
import styles from './LoginPage.module.css'

export default function LoginByGoogle() {
    const Google_Oauth_ClientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

    return (
        <div id="loginInByGoogle">
            <GoogleOAuthProvider clientId={Google_Oauth_ClientId}>
                {/* <GoogleLogin
                    onSuccess={successHandler}
                    onFailure={failureHandler}
                    cookiePolicy={'single_host_origin'}
                    scope="calendar-json.googleapis.com"
                /> */}
                <GoogleLoginBtn/>
                
            </GoogleOAuthProvider>
        </div>
    )
}

const GoogleLoginBtn = () => {
    const HomePage = process.env.REACT_APP_HOME_PAGE;
    const BackEnd_API = process.env.REACT_APP_BACKEND_API;

    const successHandler = (response) => {
        console.log("success by google login: ", response);

        fetch(BackEnd_API + '/login/oauth/google', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + response.credential
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            if(data.code == 1) {
                window.location.href = HomePage;
            }
        }).catch(() => {
            console.log("fail");
        })

    }

    const failureHandler = (res)=> {
        console.log("fail by google login", res);
    }

    const login = useGoogleLogin({
        onSuccess: {successHandler},
        onFailure: {failureHandler},
        cookiePolicy: 'single_host_origin',
        scope: 'https://www.googleapis.com/auth/calendar'
    })

    return (
        <div onClick={() => login()} className={styles.googleLoginBtn}>
            <img src={process.env.PUBLIC_URL + '/img/google.png'} className={styles.googleIcon} alt='googleIcon'/>
            <div className={styles.googleText}>
                Continue with Google
            </div>
        </div>
    )
}
 