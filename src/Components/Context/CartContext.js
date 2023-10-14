import React, { useReducer, useEffect , useState} from "react";
import ContextApi from "./ContextApi";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const crudUrl = "https://crudcrud.com/api/f2b82bd5ec374746852e777a8a11b10c";

// Function to sanitize and retrieve email from local storage
const getSanitizedEmail = () => {
  let email = localStorage.getItem("email");
  console.log(email)
  let updatedEmail;
  if (email) {
    updatedEmail = email.replace(/[^a-zA-Z0-9]/g, "");
  }
  console.log(updatedEmail);
  return updatedEmail;
};

// Function to add/update cart data in CRUD API
const addToCrudHandler = async (updatedEmail, cartData) => {
  try {
    await fetch(`${crudUrl}/${updatedEmail}`, {
      method: "POST",
      body: JSON.stringify(cartData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // Check if the item already exists in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
      let updatedItems;
    // If it exists, increase the quantity; otherwise, add it to the cart
    if (existingCartItemIndex !== -1) {
       updatedItems = [...state.items];
      const existingCartItem = updatedItems[existingCartItemIndex];
      existingCartItem.quantity += action.item.quantity;
    } else if (action.type === "SET_CART") {
      return {
        items: action.cartData.items || [],
        totalAmount: action.cartData.totalAmount || 0,
      };
    }
     else {
      updatedItems = state.items.concat(action.item);
    } 

    // Calculate the new total amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;
    const newCart = {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    
    // Update cart data in CRUD API
    addToCrudHandler(getSanitizedEmail(), newCart);

    return newCart;
  }
  return state;
};

export const CartProvider = (props) => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
const [cartState, dispatchCartAction] = useReducer(
  cartReducer,
  storedCart || defaultCartState
);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
// Function to get cart data from CRUD API
const getCartDataHandler = async (email) => {
  try {
    const response = await fetch(`${crudUrl}/${email}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

useEffect(() => {
  const email = getSanitizedEmail();
  const fetchData = async () => {
    try {
      const cartData = await getCartDataHandler(email);
      if (cartData) {
        dispatchCartAction({ type: "SET_CART", cartData: cartData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch cart data when the user opens the cart
  fetchData();
}, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    quantity: cartState.items.length,
    // removeItem: removeItemToCartHandler,
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
    localStorage.removeItem("email");
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

