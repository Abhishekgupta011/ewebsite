import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Cart from "../Cart/Cart";
import ContextApi from "../Context/ContextApi";
import { NavLink, useLocation } from "react-router-dom"; // Import NavLink and useLocation
import "./Navbar.css";
import { AuthenticationContext } from "../Context/CartContext";

const Navbarr = () => {
  const authCtx = useContext(AuthenticationContext)
  const cartContext = useContext(ContextApi);
  const location = useLocation(); // Get the current route location

  // Calculate the total number of items in the cart
  const totalItemsInCart = cartContext.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [cartShown, setCartShown] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State for cart items

  const showCartHandler = () => {
    setCartItems(cartContext.items);
    setCartShown(true);
  }

  const hideCartHandler = () => {
    setCartShown(false);
  }
  const handleLogout = () => {
    authCtx.logout();
  }

  // Conditionally render the cart button based on the current route
  const renderCartButton = () => {
    if (location.pathname === "/" || 
    location.pathname === "/about" || 
    location.pathname === "/contact" ||
    location.pathname === "/login") {
      return null; // Hide the cart button on home and about pages
    } else {
      return (
        <>
        <Button
          className='text-muted'
          style={{
            marginTop: '10px',
            marginLeft: '40px',
            border: '2px solid skyblue',
            padding: '5px',
            borderRadius: '5px',
          }}
          onClick={showCartHandler}
        >
          Cart{' '}
          {totalItemsInCart > 0 && (  // Only display <sup> if there are items in the cart
            <sup className='text-white'>
              {totalItemsInCart}
            </sup>
          )}
        </Button>

          </>
      );
    }
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" 
    className="mt-0 border-bottom border-white">
      <Container className="bg-dark">
        <Nav className="justify-content-center">
          <Nav.Link as={NavLink} to="/" exact="true" className="text-white" activeclassname="active">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/store" className="text-white" activeclassname="active">Store</Nav.Link>
          <Nav.Link as={NavLink} to="/about" className="text-white" activeclassname="active">About</Nav.Link>
          <Nav.Link as={NavLink} to="/login" className="text-white" activeclassname="active">Login</Nav.Link>
          <Nav.Link as={NavLink} to="/contact" className="text-white" activeclassname="active">Contact Us</Nav.Link>
        </Nav>
        <Nav>
        <Button style={{
            marginTop: '10px',
            marginLeft: '40px',
            padding: '5px',
            borderRadius: '5px',
          }} onClick={handleLogout}>Logout</Button>
          {renderCartButton()}
        </Nav>
      </Container>
      {cartShown && <Cart cartItems={cartItems} onClose={hideCartHandler} />}
    </Navbar>
  );
}

export default Navbarr;
