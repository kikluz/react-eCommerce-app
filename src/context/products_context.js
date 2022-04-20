import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  // hide sidebar by default 
  isSidebarOpen: false
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  // get the state and the dispath we run the type of action through dispatch
  const [state, dispatch] = useReducer(reducer, initialState)
  // in order to have some kind of functionallity we need to dispacth an action 
  // setup to fucntion one to close the side bar and the other open the sidebar 
  // ?after setup the unction pass in into the value in ProductsContext.Provider 
  const openSidebar = () => {
    // SIDEBAR_OPEN is my action 
    dispatch({ type: 'SIDEBAR_OPEN' })
  }
  const closeSidebar = () => {
    dispatch({ type: 'SIDEBAR_CLOSE' })
  }


  return (
    <ProductsContext.Provider
      value={{
        ...state, openSidebar, closeSidebar
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
