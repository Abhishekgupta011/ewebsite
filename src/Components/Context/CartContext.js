import React, { useReducer, useEffect, useContext } from "react";
import ContextApi from "./ContextApi";
import { AuthenticationContext } from "./AuthContext";


const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const crudUrl = "https://crudcrud.com/api/e52365befa1147c7be4820bc3ff859ca";

// Function to sanitize and retrieve email from local storage
const getSanitizedEmail = () => {
  let email = localStorage.getItem("email");
  console.log(email)
  let updatedEmail;
  if (email) {
    updatedEmail = email.replace(/[^a-zA-Z0-9]/g, "");
    return updatedEmail;
  }
  console.log(updatedEmail);
  return null;
  
};

// Function to add/update cart data in CRUD API
const addToCrudHandler = async (updatedEmail, cartData) => {
  const authToken = localStorage.getItem("authToken");
  // console.log("authToken:", authToken);
  console.log("updatedEmail:", updatedEmail);
  if (authToken) {
    try {
      await fetch(`${crudUrl}/cart${updatedEmail}`, {
        method: "POST",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const cartReducer = (state, action) => {
  if(action.type === 'INITIALCART'){

    let totalAmount = 0;
    
    // console.log(action.data);
    totalAmount = action.items.reduce((acc, item) => acc+item.price*item.quantity,0);

    console.log('totalamount',totalAmount);
    return {
        items: action.items,
        totalAmount : totalAmount,

    }
 
}

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

  if(action.type=== "REMOVE"){
    let existingCartItemIndex = state.items.findIndex((item)=>item.id === action.id)
    const existingItems = state.items[existingCartItemIndex];
    let TotalAmount = existingItems.price * existingItems.quantity;
    let updatedTotalAmount = state.totalAmount - TotalAmount;
    console.log(updatedTotalAmount)
    let updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      ...state.items,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

    if (action.type=== "CLEAR_CART"){
    return defaultCartState;
  }
  return state;
};

export const CartProvider = (props) => {
  const Authctx = useContext(AuthenticationContext)
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
     defaultCartState
  );

  const removeFromCartApi = async(email ,id) =>{
    // try {
    //   console.log("dddddd")
    //   const response = await fetch(`${crudUrl}/cart/${email}/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
      
    //   if (response.ok) {
    //     dispatchCartAction({ type: "REMOVE", id: id });
    //   } else {
    //     console.error("Error removing item from cart in the API");
    //   }
    // } catch (error) {
    //   console.error("Error removing item from cart:", error);
    // }
  }

  const fetchData = async () => {
    console.log("fetch working");
    try {
      const email = getSanitizedEmail();
      if (email) {
        const response = await fetch(`${crudUrl}/cart${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        if (data && data.length > 0) {
          // Assuming data[data.length - 1].items is the array you want to use
          const items = data[data.length - 1].items;

          // Dispatch an action to update the cart state
          dispatchCartAction({ type: "INITIALCART", items: items });
        }
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Authctx.isLoggedIn ]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
    // fetchData();
  };
 const removeItemToCartHandler = (id) => {
  dispatchCartAction({ type: "REMOVE" , id: id})
  const email = getSanitizedEmail();
  //removeFromCartApi(email ,id);
  // console.log(id)
 }
  

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    quantity: cartState.items.length,
    clearCart: clearCartHandler,
    //fetchdata: fetchDataHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <ContextApi.Provider value={cartContext}>
      {props.children}
    </ContextApi.Provider>
  );
};

