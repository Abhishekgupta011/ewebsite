import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AuthenticationProvider, CartProvider } from './Components/Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <AuthenticationProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthenticationProvider>
  </Router>
);
