import React, { useReducer } from "react";
import ContextApi from "./ContextApi";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // Check if the item already exists in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // If it exists, increase the quantity; otherwise, add it to the cart
    if (existingCartItemIndex !== -1) {
      const updatedItems = [...state.items];
      const existingCartItem = updatedItems[existingCartItemIndex];
      existingCartItem.quantity += action.item.quantity;
    } else {
      state.items.push(action.item);
    }

    // Calculate the new total amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    return {
      ...state,
      items: [...state.items],
      totalAmount: updatedTotalAmount,
    };
  }
};

const CartContext = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
  };

  return (
    <ContextApi.Provider value={cartContext}>
      {props.children}
    </ContextApi.Provider>
  );
};

export default CartContext;
