import React, { useReducer } from "react";
import ContextApi from "./ContextApi";

const defaultCartState = ({
    items:[],
    totalAmount:0,
})
const cartReducer = (state , action)=>{
    if(action.type==="ADD"){
        
    }

}
const CartContext = (props)=>{
    const [cartState , dispatchCartAction] = useReducer(cartReducer , defaultCartState)
    const addItemHandler = (item) =>{
        dispatchCartAction({type:'ADD', item:item})
    }
    const cartContext = ({
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
    })
    return(
        <ContextApi.Provider value={cartContext}>
            {props.children}
        </ContextApi.Provider>
    )
}

export default CartContext;