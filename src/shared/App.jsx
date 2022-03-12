import '../css/App.css';
import styled from 'styled-components';
import { Routes, Route, } from 'react-router-dom';

import { Header, Footer, Inner } from '../components/index';
import { Main, Search, Kakao, GoogleButton, Detail } from '../pages/index';
// import Naver from "../pages/NaverLogin";
import React from 'react';

function App(props) {
  return (
    <React.Fragment>
      <Header />
      <Container className='container'>
        <Inner>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Kakao />} />
            <Route path="/login2" element={<GoogleButton />} />
            {/* <Route path="/login3" element={<Naver />} /> */}
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Inner>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
const Container = styled.div`
  width: 100%;
  flex-grow: 1;
`

export default App;
