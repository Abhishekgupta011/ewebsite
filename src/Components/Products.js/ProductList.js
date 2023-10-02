import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import cartElements from "../Cart/CartElements";

import './ProductList.css'
import { Link } from "react-router-dom";
import AddToCartButton from "./Button/AddToCartButton";
const ProductList = ()=>{

    return (
        <Container className=''>
        <h3 className="text-center mb-4">MUSIC</h3>
          <Row>
            {cartElements.map((item) => (
              <Col key={item.id} xs={6} md={6}>
                <div className='item text-center'>
                  <h5 className="mt-3">{item.title}</h5><br />
                  <div className="image-container">
                    <Link to={`/products/${item.id}`}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="img-fluid rounded hover-zoom"
                      />
                    </Link>
                  </div><br />
                  <Container>
                    <Row>
                      <Col>
                        <span>${item.price}</span><br />
                        <AddToCartButton item={item}/>
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