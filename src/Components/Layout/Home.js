import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import HomeElements from "./HomeElemts";

const Home = () => {
  return (
    <Container className="col-9 mt-3">
      <h1 className="text-center mb-3">Tours</h1>
      {HomeElements.map((item) => (
        <Row key={item.id} xs={4} className="border-bottom p-2 pr-0 ms-0 me-0 mb-3">
          <Col>{item.date}</Col>
          <Col>{item.location}</Col>
          <Col>{item.description}</Col>
          <Col>
            <Button>BUY TICKETS</Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Home;
