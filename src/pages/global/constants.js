export const HomePage_URL = "http://localhost:3000"

export const BackEnd_API_URL = "http://localhost:8080"

export const Google_Oauth_ClientId = "510468186222-ut83218bhe7j3e908oh417vj3algu10l.apps.googleusercontent.com";

export const validInput = {
    phoneNumber: '[0-9]{8,9}',
    email: '[^\s@]+@[^\s@]+\.[^s@]{1,30}',
    all: '[0-9a-zA-Z`!@#$%^&*?]{1,20}',
    charAndNum: '[0-9a-zA-Z]{1,20}',
    charOnly: '[a-zA-Z ]{1,20}',
    numOnly: '[0-9]{1,20}'
};

export const validInputMessage = {
    phoneNumber: 'Number Only (8-9 digit for different country)',
    email: 'Email format',
    all: 'Special character acceptable (Max 20 digits)',
    charAndNum: 'Character and number are acceptable (Max 20 digits)',
    charOnly: 'Character Only (Max 20 digits)',
    numOnly: 'Number Only (Max 20 digits)'
};