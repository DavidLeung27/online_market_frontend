import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import React, { useEffect } from 'react'
import styles from './LoginPage.module.css'
import { useSearchParams } from 'react-router-dom';

export default function LoginByGoogle() {
    const HomePage = process.env.REACT_APP_HOME_PAGE;
    const BackEnd_API = process.env.REACT_APP_BACKEND_API;
    const Google_Oauth_ClientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
    const [googleResponse, setGoogleResponse] = useSearchParams();


    useEffect(() => {
        const googleErrorResponse = googleResponse.get('error');

        if (googleErrorResponse) {
            failureHandler();
            return ;
        }

        const googleResponseCode = googleResponse.get('code');

        if (googleResponseCode) {
            successHandler(googleResponseCode);
        }
    }, [googleResponse])

    const successHandler = (responseCode) => {
        console.log("success by google login: ", responseCode);

        fetch(BackEnd_API + '/login/oauth/google', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + responseCode
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            if(data.code == 1) {
                localStorage.setItem("accessToken", data.data)
                window.location.href = HomePage;
            }
        }).catch(() => {
            console.log("fail");
        })

    }

    const failureHandler = (res)=> {
        console.log("fail by google login", res);
    }


    return (
        <div id="loginInByGoogle">
            <GoogleOAuthProvider clientId={Google_Oauth_ClientId}>
                <GoogleLoginBtn/>       
            </GoogleOAuthProvider>
        </div>
    )
}

const GoogleLoginBtn = () => {
    const HomePage = process.env.REACT_APP_HOME_PAGE;

    const login = useGoogleLogin({
        flow: 'auth-code',
        cookiePolicy: 'single_host_origin',
        ux_mode: 'redirect',
        redirect_uri: {HomePage} + '/login',
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
 