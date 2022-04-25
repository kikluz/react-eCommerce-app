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
  all_products: [],
  grid_view: true,
  // fos contril input 2 things  1 state value 2 function that we run everytime that we cahge in the input
  sort: 'price-lowest'
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

  // this is useEffect will run when we change the state value on the sort by 
  // dependandy array run products and also state of sort changes  
  useEffect(() => {
    // invoke dispath action with type SORT_PRODUCTS
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort])

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  // function that is looking for the event
  const updateSort = (e) => {
    // setup name so we update sort on our select event target point to the input
    // for demonstration 
    // const name = e.target.name
    // verytime I do something with select  I will update state
    const value = e.target.value
    // we dispath an action and the type is UPDATE_SORT and the payload I will paas the value
    dispatch({ type: UPDATE_SORT, payload: value })
  }
  return (
    // get the values from the state and pass it in the value 
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      updateSort
    }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use for custom hook
export const useFilterContext = () => {
  return useContext(FilterContext)
}
