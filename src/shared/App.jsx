import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";
import { Main, Search, Detail, Login, Mypage, Auth, FolderDetail, Curation, LawAgree } from '../pages/index';
import { Header, Footer, Inner } from '../components/index';
import { Theme, GlobalStyle } from '../styles/index';

function App(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("ybrn");

  React.useEffect(() => {
    if (token) {
      dispatch(userActions.loginCheckFB());
    } 
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <Header />
      <Container className='container'>
        <Inner>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/law" element={<LawAgree />} />
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path={"/auth/kakao/callback"} element={<Auth />} />
            <Route path={"/folder/:id"} element={<FolderDetail />} />
            <Route path={"/curation"} element={<Curation />} />
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
