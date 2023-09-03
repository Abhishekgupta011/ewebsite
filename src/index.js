import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CartContext from './Components/Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartContext>
    <App />
  </CartContext>
);
