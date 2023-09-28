import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./ContactUs.css"
const ContactUs = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState('');
  const [num, setNum] = useState('');

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const mailHandler = (event) => {
    setMail(event.target.value);
  };

  const numberHandler = (event) => {
    setNum(event.target.value);
  };

  const submitHandler = async () => {
    try {
      const response = await fetch('https://ecommerce-5c0bf-default-rtdb.firebaseio.com/newObj.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          mail,
          num,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form.');
      }

      // Reset form fields after successful submission
      setName('');
      setMail('');
      setNum('');
      
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form">
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" onChange={nameHandler} value={name} />
      </Form.Group>

      <Form.Group controlId="mail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" onChange={mailHandler} value={mail} />
      </Form.Group>

      <Form.Group controlId="phonenumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" onChange={numberHandler} value={num} />
      </Form.Group>

      <Button variant="primary" type="button" onClick={submitHandler}
      className="mt-3">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default ContactUs;
