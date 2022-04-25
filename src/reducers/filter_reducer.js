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
    return (
      { ...state, all_products: [...action.payload], filtered_products: [...action.payload] }
    )
  }
  // we toggle the  SET_LISTVIEW, SET_GRIDVIEW
  // ifaction type is equal to SET_GRIDVIEW then return 
  if (action.type === SET_GRIDVIEW) {
    // state and the grid_view to true 
    return (
      { ...state, grid_view: true }
    )
  }
  if (action.type === SET_LISTVIEW) {
    // state and the grid_view to true 
    return (
      { ...state, grid_view: false }
    )
  }
  // check for the action 
  if (action.type === UPDATE_SORT) {
    return (
      { ...state, sort: action.payload }
    )
  }
  // tin this case we get 2 values out of the state 
  if (action.type === SORT_PRODUCTS) {
    // fisrt get the sort value ,second get the  filter products
    const { sort, filtered_products } = state;
    // one by one we use filtered_products and changes the order and if the values matches 
    // setup equal to wherever Im filtering 
    let temProduts = [...filtered_products];
    if (sort === 'price-lowest') {
      // what do I want in here? get temProduts and  use the sort methos to return
      // a,b that represent the current item and the next item and sor them by price basing the small one 
      temProduts = temProduts.sort((a, b) => {
        // a is place before b 
        if (a.price < b.price) {
          return -1
        }
        // if a price is bigger retirn plus 1 
        if (a.price > b.price) {
          return 1
        }
        return 0
      })
    }
    if (sort === 'price-highest') {
      // sort them to the highest price by b.price - a.price 
      temProduts = temProduts.sort((a, b) => b.price - a.price)
    }

    // String.prototype.localeCompare() learn about this 
    if (sort === 'name-a') {
      temProduts = temProduts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      temProduts = temProduts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return (
      { ...state, filtered_products: temProduts }
    )
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
