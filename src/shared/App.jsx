import '../css/App.css';
import { Routes, Route, } from 'react-router-dom';

import { Header, Footer } from '../components/index';
import { Main, Search } from '../pages/index';

function App() {
  return (
    <div className="App">
      
      <Header />
      <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/search" element={<Search />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
