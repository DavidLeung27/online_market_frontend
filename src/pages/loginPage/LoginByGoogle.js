import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'
import { BackEnd_API_URL, Google_Oauth_ClientId, HomePage_URL } from '../global/constants';

export default function LoginByGoogle() { 

    const successHandler = (response) => {
        console.log("success by google login: ", response);

        fetch(BackEnd_API_URL + '/login/oauth/google', {
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
                window.location.href = HomePage_URL;
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
                <GoogleLogin
                    onSuccess={successHandler}
                    onFailure={failureHandler}
                    cookiePolicy={'single_host_origin'}
                    scope="calendar-json.googleapis.com"
                />
            </GoogleOAuthProvider>
        </div>
    )
}
