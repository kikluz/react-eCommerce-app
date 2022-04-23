import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  // detup two props array that alway changing 
  filtered_products: [],
  all_products: []
}

const FilterContext = React.createContext()
// get the products trough the FilterProvider component 
export const FilterProvider = ({ children }) => {
  // ? get the products (Remember can not pass in the state directly  we do it in the use effect)
  // ? when component amount dispatch an action which is "LOAD_PRODUCTS"
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState)

  // in the depencendy array we invoke the products and invoke the dispath with type LOAD_PRODUCTS
  // and payloads as products (now can handle in the reducer folder filter_reducer) 
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])
  return (
    // get the values from the state and pass it in the value 
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use for custom hook
export const useFilterContext = () => {
  return useContext(FilterContext)
}
