import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { Routes, Route, } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";
import Theme from './Theme';
import '../css/App.css';

import { Header, Footer, Inner } from '../components/index';
import { Main, Search, Detail, Login, Mypage, Auth } from '../pages/index';

function App(props) {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();
  const token = localStorage.getItem("ybrn");
  // const is_loaded = useSelector((state) => state.movie.is_loading);

  React.useEffect(() => {
    if (!token) {
      dispatch(userActions.logoutFB());
      return;
    }else {
      dispatch(userActions.loginCheckFB());
    } 
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Header />
      <Container className='container'>
        <Inner>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path={"/auth/kakao/callback"} element={<Auth />} />
          </Routes>
        </Inner>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
const Container = styled.div`
  width: 100%;
  flex-grow: 1;
`

export default App;
