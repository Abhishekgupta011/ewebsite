import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbarr from './Components/Layout/Navbar';
import About from './Components/Layout/About';
import Header from './Components/Layout/Header';
import ProductList from './Components/Products.js/ProductList';
import Home from './Components/Layout/Home';
import Footer from './Components/Layout/Footer';
import ContactUs from './Components/Layout/ContactUs';

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbarr />
      <Header />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/store" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
