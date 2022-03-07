import "../css/App.css";

import { Route, Routes } from "react-router-dom";
import { Main, Kakao, GoogleButton } from "../pages/index";
import { Header, Footer } from "../components/index";
import Naver from "../pages/NaverLogin";

function App() {
  return (
    <div className="wrap">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Kakao />} />
        <Route path="/login2" element={<GoogleButton />} />
        <Route path="/login3" element={<Naver />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
