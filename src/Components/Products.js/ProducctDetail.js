import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import cartElements from '../Cart/CartElements';
import './ProducctDetail.css'
import AddToCartButton from './Button/AddToCartButton';

const ProductDetail = ({ reviews }) => {

  const { productId } = useParams();
  const product = cartElements.find((item) => item.id === parseInt(productId, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  const productReviews = reviews.filter((review) => review.productId === product.id);

  return (
    <Container className='product-detail'>
      <h1>{product.title}</h1>
      <div className='hover-zoom'>
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
      <AddToCartButton item={product}/>
    </Container>
  );
};

export default ProductDetail;
