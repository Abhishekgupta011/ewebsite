import React, { useContext } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import ContextApi from "../Context/ContextApi"; // Import the context

const Cart = (props) => {
  // Use useContext to access the cart context
  const cartContext = useContext(ContextApi);

  return (
    <Modal show={true} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Container>
            <Row>
              <Col>
                <h3 style={{ borderBottom: "3px solid #000" }}>Item</h3>
              </Col>
              <Col>
                <h3 style={{ borderBottom: "3px solid #000" }}>Price</h3>
              </Col>
              <Col>
                <h3 style={{ borderBottom: "3px solid #000" }}>Quantity</h3>
              </Col>
            </Row>
          </Container>
         
          {cartContext.items.map((item, index) => (
            <Row key={index} className="align-items-center">
              <Col>
                <img src={item.imageUrl} alt={item.title} style={{ width: "40%" }} />
                <span>{item.title}</span>
              </Col>
              <Col>
                <span>${item.price}</span>
              </Col>
              <Col>
                <input min={0} max={5} value={item.quantity} />
                <Button variant="danger">Remove</Button>
              </Col>
            </Row>
           
          ))}
          
          <h3>Total $ {cartContext.totalAmount.toFixed(2)}</h3>
        </Container>
        <Button variant="primary">PURCHASE</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
