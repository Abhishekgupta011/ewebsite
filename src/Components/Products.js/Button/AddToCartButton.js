import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import ContextApi from '../../Context/ContextApi';

const AddToCartButton = ({ item }) => {
  const crtctx = useContext(ContextApi);

  const addToCartHandler = () => {
    crtctx.addItem({
      id: item.id,
      title: item.title,
      amount: item.amount,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
    });
  };

  return (
    <Button className='add-to-cart' onClick={addToCartHandler}>
      ADD TO CART
    </Button>
  );
};

export default AddToCartButton;
