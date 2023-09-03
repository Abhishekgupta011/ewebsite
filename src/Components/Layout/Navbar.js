import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import cartElements from "../Cart/CartElements";
import Cart from "../Cart/Cart";
import ContextApi from "../Context/ContextApi";

const Navbarr = () => {
  const cartContext = useContext(ContextApi);

  // Calculate the total number of items in the cart
  const totalItemsInCart = cartContext.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [cartShown, setCartShown] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State for cart items

  const showCartHandler = () => {
    setCartItems(cartElements); // Load cart items (you may want to load them from your data source)
    setCartShown(true); // Show the cart modal
  }

  const hideCartHandler = () => {
    setCartShown(false); // Hide the cart modal
  }

  return (
    <Navbar>
      <Container className="bg-dark">
        <Nav className="justify-content-center">
          <Nav.Link href="#" className="text-white">Home</Nav.Link>
          <Nav.Link href="#" className="text-white">Store</Nav.Link>
          <Nav.Link href="#" className="text-white">About</Nav.Link>
        </Nav>
        <Nav>
          <Button onClick={showCartHandler}>Cart</Button>
          <Badge>{totalItemsInCart}</Badge>
        </Nav>
      </Container>
      {cartShown && <Cart cartItems={cartItems} onClose={hideCartHandler} />}
    </Navbar>
  );
}

export default Navbarr;
