import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CartContext from './Components/Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> {/* Wrap your entire app with BrowserRouter */}
    <CartContext>
      <App />
    </CartContext>
  </Router>
);
