import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './profilePages/homePage/HomePage';
import SignUpPage from './marketPages/signupPage/SignUpPage';
import LoginPage from './marketPages/loginPage/LoginPage';
import ProfilePage from './marketPages/profilePage/ProfilePage';
import ProductPage from './marketPages/productPage/ProductPage';
import ProductUploadPage from './marketPages/productUploadPage/ProductUploadPage';
import NotFound from './global/404Page/NotFound';
import './global/base.css'
import styles from './MainPage.module.css'
import ProfileFooter from './profilePages/profileFooter/ProfileFooter';
import ProfileHeader from './profilePages/profileHeader/ProfileHeader';
import MarketHeader from './marketPages/marketHeader/MarketHeader';
import ResumePage from './profilePages/resumePage/ResumePage';
import ProjectPage from './profilePages/projectPage/ProjectPage';
import MarketHomePage from './marketPages/marketHomePage/MarketHomePage';

const Header = () => {
  const location = useLocation();
  const isOnlineMarket = location.pathname.startsWith('/online-market');

  return (
    <div>
      { isOnlineMarket ? <MarketHeader/> : <ProfileHeader/> }
    </div>
  )
}


function MainPage() {

  return (
    <div className={styles.pageContainer}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          {/* <Route path='/resume' element={<ResumePage/>}/> */}
          <Route path='/project' element={<ProjectPage/>}/>
          <Route path='/online-market' element={<MarketHomePage/>}/>
          <Route path='/online-market/product/*' element={<ProductPage/>}/>
          <Route path='/online-market/upload' element={<ProductUploadPage/>}/>
          <Route path='/online-market/login' element={<LoginPage/>}/>
          <Route path='/online-market/signup' element={<SignUpPage/>}/>
          <Route path='/online-market/profile' element={<ProfilePage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <ProfileFooter/>
      </BrowserRouter>
    </div>
  );
}

export default MainPage;
