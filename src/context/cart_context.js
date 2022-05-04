import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

// fucntion that check if we have the item in the local storage by the name of cart
// if we do setup cart equal to that
const getLocalStorage = () => {
  // localStorage is a browers api
  // check for the value if there is something there
  let cart = localStorage.getItem("cart");
  if (cart) {
    // if item cart exist
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    // if there is nothing in there return empty array
    return [];
  }
};

const initialState = {
  // we invoke the getLocalStorage
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  // setup ueseReducer and pass the reducer thats is comming from the cart_reducer
  // and pass the initialState
  const [state, dispatch] = useReducer(reducer, initialState);
  // add to cart we are passing 4 parameter into the function
  const addToCart = (id, color, amount, product) => {
    // here in the payload passing all the values that are coming as parameter
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  // remove item
  const removeItem = (id) => {};
  // toggle amounnt
  const toggleAmount = (id, value) => {};
  // clear item
  const clearCart = () => {};

  useEffect(() => {
    // everytime something chnages grab the value and
    // overwieting in the local storage  only can store strings
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
