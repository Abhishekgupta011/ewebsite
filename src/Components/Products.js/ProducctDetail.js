import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import ContextApi from '../Context/ContextApi';
import cartElements from '../Cart/CartElements';

const ProductDetail = ({ reviews }) => {
  const crtctx = useContext(ContextApi);
  const { productId } = useParams();
  const product = cartElements.find((item) => item.id === parseInt(productId, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  const productReviews = reviews.filter((review) => review.productId === product.id);

  return (
    <Container className='product-detail'>
      <h1>{product.title}</h1>
      <div className='image-container'>
        {/* Assuming you want to display a single image */}
        <img src={product.imageUrl} alt={`Product`} />
      </div>
      <div className='reviews-container'>
        <h2>Reviews</h2>
        {productReviews.map((review) => (
          <div key={review.id} className='review'>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
      <Button className='add-to-cart' onClick={() => crtctx.addItem(product)}>
        ADD TO CART
      </Button>
    </Container>
  );
};

export default ProductDetail;
