import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
// we toggle
const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // if this is the case changes the state values
    //  set products that are comming from the payload equal to both of them 
    // spread and all_products equal to payload and filter_products too
    return { ...state, all_products: [...action.payload], filtered_products: [...action.payload] }
  }
  // we toggle the  SET_LISTVIEW, SET_GRIDVIEW
  // ifaction type is equal to SET_GRIDVIEW then return 
  if (action.type === SET_GRIDVIEW) {
    // state and the grid_view to true 
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    // state and the grid_view to true 
    return { ...state, grid_view: false }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
