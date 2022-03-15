import "../css/App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import { Header, Footer, Inner } from "../components/index";
import { Main, Search, Login, Mypage } from "../pages/index";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container className="container">
        <Inner>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </Inner>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
const Container = styled.div`
  width: 100%;
`;

export default App;
