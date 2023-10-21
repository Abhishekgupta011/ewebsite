import React, { useContext } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import ContextApi from "../Context/ContextApi"; // Import the context

const Cart = (props) => {
  // Use useContext to access the cart context
  const cartContext = useContext(ContextApi);

  return (
    <Modal show={true} onHide={props.onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="mb-3">
            <Col xs={6}>
              <h4>Item</h4>
            </Col>
            <Col xs={2}>
              <h4>Price</h4>
            </Col>
            <Col xs={4}>
              <h4>Quantity</h4>
            </Col>
          </Row>
         
          {cartContext.items.map((item, index) => (
            <Row key={index} className="mb-4 align-items-center border-bottom">
              <Col xs={6}>
                <div className="d-flex align-items-center">
                  <img className="mb-3" src={item.imageUrl} 
                  alt={item.title} 
                  style={{ width: "80px" }} />
                  <span className="ms-3">{item.title}</span>
                </div>
              </Col>
              <Col xs={2}>
                <span>${item.price}</span>
              </Col>
              <Col xs={3}>
                <div className="d-flex align-items-center">
                  <input min={0} max={5} className="border-2 me-3" value={item.quantity} style={{ width: "50%" }} />
                  <Button variant="danger" onClick = {()=>{cartContext.removeItem(item.id)}}>REMOVE</Button>
                </div>
              </Col>

            </Row>
          ))}
          
          <Row className="mt-4">
            <Col xs={8}>
              <h3>Total:</h3>
            </Col>
            <Col xs={4} className="text-end">
              <h3>${cartContext.totalAmount.toFixed(2)}</h3>
            </Col>
          </Row>
        </Container>
        <Button className="mx-auto mt-5 d-block" variant="primary">PURCHASE</Button>
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
