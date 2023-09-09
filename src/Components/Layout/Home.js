import React, { Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import HomeElements from "./HomeElemts";
import { BsPlayCircle } from "react-icons/bs";

const Home = () => {
  return (
    <Fragment>
      <div
       
        className=" d-flex justify-content-center align-items-center"
      >
        <button className="btn btn-outline-primary">
          <h5>Get Our Latest Album</h5>
        </button>
      </div>
      <div
        style={{
          height: "150px",
          backgroundColor: "#FFFFFF",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <a href="#">
          <BsPlayCircle size="80px" />
        </a>
      </div>
      <Container className="col-9 mt-3">
        <h1 className="text-center mb-3">Tours</h1>
        {HomeElements.map((item) => (
          <Row
            key={item.id}
            xs={4}
            className="border-bottom p-2 pr-0 ms-0 me-0 mb-3"
          >
            <Col>{item.date}</Col>
            <Col>{item.location}</Col>
            <Col>{item.description}</Col>
            <Col>
              <Button>BUY TICKETS</Button>
            </Col>
          </Row>
        ))}
      </Container>
    </Fragment>
  );
};

export default Home;
