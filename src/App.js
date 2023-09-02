import './App.css';
import productsArr from './Components/Products.js/Products';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Navbarr from './Components/Layout/Navbar';
function App() {
  return (
    <div className="App">
      <Navbarr/>
      <h3 className="bg-primary text-center text-white p-3">Generics</h3>

      <Container className='mt-3'>
        <Row >
            {productsArr.map((item) => (
              <Col key={item.id} xs={6} md={6}>
              <div className='item'> {/* Added a unique key */}
                <span className="display-6">{item.title}</span><br/>
                <img src={item.imageUrl} alt={item.title} /><br />
                <Container>
                  <Row>
                    <Col>
                    <span>${item.price}</span><br/>
                    <Button className='m-1'>ADD TO CART</Button>
                    </Col>
                  </Row>
                </Container>
                
              </div>
              </Col>
            ))}
          
        </Row>
      </Container>
    </div>
  );
}

export default App;
