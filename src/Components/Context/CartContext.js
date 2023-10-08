import React, { useReducer, useEffect, useState } from "react";
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


export const CartProvider = (props) => {
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

export const AuthenticationContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expiresIn) => {},
  logout: () => {},
  refreshToken: "",
  expiresIn: "",
});

export const AuthenticationProvider = (props) => {
  const storedToken = localStorage.getItem("authToken");
  const [token, setToken] = useState(storedToken);
  const userLoggedIn = !!token;

  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const login = (newToken, expiresIn = 300) => {
    setToken(newToken);
    const expirationTime = expiresIn * 1000; // Convert expiresIn to milliseconds
    setTimeout(logout, expirationTime); // Set timeout for auto logout

    localStorage.setItem("authToken", newToken);
    localStorage.setItem("expirationTime", expirationTime.toString());
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("expirationTime");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: login,
    logout: logout,
    refreshToken: "",
    expiresIn: "",
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
