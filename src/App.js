import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Navbarr from './Components/Layout/Navbar';
import About from './Components/Layout/About';
import Header from './Components/Layout/Header';
import ProductList from './Components/Products.js/ProductList';
import Home from './Components/Layout/Home';
import Footer from './Components/Layout/Footer';
import ContactUs from './Components/Layout/ContactUs';
import ProductDetail from './Components/Products.js/ProducctDetail';
import LoginPage from "./Components/Login/LoginPage"

const reviews = [
  { id: 1, productId: 1, comment: 'Great product!', rating: 5 },
  { id: 2, productId: 2, comment: 'Could be better.', rating: 3 },
  // Add more reviews as needed
];

const App = () => {

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
          <Route path='/login' element={<LoginPage />} />
          <Route
            path="/products/:productId"
            element={<ProductDetail reviews={reviews} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
