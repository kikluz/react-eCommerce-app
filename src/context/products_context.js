import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
//? importing the products_url setup as url 
import { products_url, products_url as url } from '../utils/constants'
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
// ?Here add more porp in the initial state 
const initialState = {
  // hide sidebar by default 
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],


}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  // get the state and the dispath we run the type of action through dispatch
  const [state, dispatch] = useReducer(reducer, initialState)
  // in order to have some kind of functionallity we need to dispacth an action 
  // setup to fucntion one to close the side bar and the other open the sidebar 
  // ?after setup the function pass in into the value in ProductsContext.Provider 
  const openSidebar = () => {
    // SIDEBAR_OPEN is my action 
    dispatch({ type: 'SIDEBAR_OPEN' })
  }
  const closeSidebar = () => {
    dispatch({ type: 'SIDEBAR_CLOSE' })
  }

  //? Here fetch API at the same time 
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(url)
      const products = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  };

  // useEffect so can fetch once 
  useEffect(() => {
    fetchProducts(url);
  }, [])


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
