import React from 'react';
import Navbarr from './Components/Layout/Navbar';
import About from './Components/Layout/About';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Layout/Header';
import ProductList from './Components/Products.js/ProductList';
import Home from './Components/Layout/Home';
import Footer from './Components/Layout/Footer';

function App() {

  return (
    <div className="App">
      <Navbarr />
      <Header />
        <Routes>
          <Route path="/store" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
