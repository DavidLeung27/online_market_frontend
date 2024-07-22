import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './pages/header/Header';
import HomePage from './pages/homePage/HomePage';
import SignUpPage from './pages/signupPage/SignUpPage';
import LoginPage from './pages/loginPage/LoginPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import ProductPage from './pages/productPage/ProductPage';
import ProductUploadPage from './pages/productUploadPage/ProductUploadPage';
import NotFound from './pages/404Page/NotFound';
import './pages/global/base.css'
import styles from './pages/MainPage.module.css'
import ProfileFooter from './profilePages/profileFooter/ProfileFooter';
import ProfileHeader from './profilePages/profileHeader/ProfileHeader';


function MainPage() {

  return (
    <div className={styles.pageContainer}>
      <BrowserRouter>
        {/* <Header/> */}
        <ProfileHeader/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/product/*' element={<ProductPage/>}/>
          <Route path='/upload' element={<ProductUploadPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <ProfileFooter/>
      </BrowserRouter>
    </div>
  );
}

export default MainPage;
