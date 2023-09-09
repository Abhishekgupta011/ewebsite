import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import cartElements from "../Cart/CartElements";
import ContextApi from "../Context/ContextApi";
import './ProductList.css'
const ProductList = ()=>{
    const crtctx = useContext(ContextApi);

  const addToCartHandler = (item) => {
    crtctx.addItem({
      id: item.id,
      title: item.title,
      amount: item.amount,
      price: item.price,
      quantity: 1, 
      imageUrl: item.imageUrl,
    });
  }
    return (
        <Container className=''>
        <h3 className="text-center mb-4">MUSIC</h3>
          <Row>
            {cartElements.map((item) => (
              <Col key={item.id} xs={6} md={6}>
                <div className='item text-center'>
                  <h5 className="mt-3">{item.title}</h5><br />
                  <div className="image-container">
                  <img src={item.imageUrl} alt={item.title} 
                  className="img-fluid rounded hover-zoom"
                  />
                  </div><br />
                  <Container>
                    <Row>
                      <Col>
                        <span>${item.price}</span><br />
                        <Button className='m-1' onClick={() => addToCartHandler(item)}>ADD TO CART</Button>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
    )
}

export default ProductList;