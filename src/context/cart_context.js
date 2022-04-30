import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'


const initialState = {
  cart:[],
  total_items:0,
  total_amount: 0,
  shipping_feed: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  // setup ueseReducer and pass the reducer thats is comming from the cart_reducer
  // and pass the initialState 
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{...state }}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
