import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import cartElements from "../Cart/CartElements";
import Cart from "../Cart/Cart";
import ContextApi from "../Context/ContextApi";
import { NavLink, useLocation } from "react-router-dom"; // Import NavLink and useLocation

const Navbarr = () => {
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
    setCartItems(cartElements);
    setCartShown(true);
  }

  const hideCartHandler = () => {
    setCartShown(false);
  }

  // Conditionally render the cart button based on the current route
  const renderCartButton = () => {
    if (location.pathname === "/" || location.pathname === "/about") {
      return null; // Hide the cart button on home and about pages
    } else {
      return (
        <>
        <Button className="rounded-pill" onClick={showCartHandler}>
          Cart
        </Button>
        <Badge pill bg="danger" 
          className="position-absolute top-0 end-1 mt-3 ms-1  translate-middle ">{totalItemsInCart}</Badge>
          </>
      );
    }
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" 
    className="mt-0 border-bottom border-white">
      <Container className="bg-dark">
        <Nav className="justify-content-center">
          <Nav.Link as={NavLink} to="/" exact className="text-white">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/store" className="text-white">Store</Nav.Link>
          <Nav.Link as={NavLink} to="/about" className="text-white">About</Nav.Link> 
        </Nav>
        <Nav>
          {renderCartButton()}
        </Nav>
      </Container>
      {cartShown && <Cart cartItems={cartItems} onClose={hideCartHandler} />}
    </Navbar>
  );
}

export default Navbarr;
