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
    // get the max price for filter 
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    // console.log(maxPrice)
    // if this is the case changes the state values
    //  set products that are comming from the payload equal to both of them 
    // spread and all_products equal to payload and filter_products too
    return (
      {
        ...state,
        // alway has to have the fresh copy of all products  all data
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        // copy old values and cange the value of max_price 
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
      }
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
    // setup equal to wherever Im filtering (always start from the start)
    let temProduts = [...filtered_products];
    if (sort === 'price-lowest') {
      // what do I want in here? get temProduts and  use the sort methos to return
      // a,b that represent the current item and the next item and sor them by price basing the small one 
      temProduts = temProduts.sort((a, b) => {
        // a is place before b 
        if (a.price < b.price) {
          // return negative 1 
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

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return (
      // copy the state and changes the filters passing the name dynamicly and the value
      { ...state, filters: { ...state.filters, [name]: value } }
    )
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters
    // we overwrite eveytime we have some kind of filter functionallity 
    let tempProducts = [...all_products]
    // start filtering the products 
    if (text) {
      // new value is wherever i get from this filters its going to be display in the product pages 
      tempProducts = tempProducts.filter((product) => {
        // return only the products that start we the text that I start  in the text input 
        return (
          product.name.toLowerCase().startsWith(text)
        )
      })
    }
    // category  is not equal to 'all' 
    if (category !== 'all') {
      // do filtering base on category, whant the product whos category values matches in the  state 
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }

    // Compoany 
    if (company !== 'all') {
      tempProducts = tempProducts.filter((companyItem) => companyItem.company === company)
    }

    // color filter products 
    if (color !== 'all') {
      tempProducts = tempProducts.filter((productColor) => {
        return (
          productColor.colors.find((c) => c === color)
        )
      })
    }

    // price filter 
    // here if the price is less or equal to th eprice coming from the state 
    // checking for the price on the props 
    tempProducts = tempProducts.filter((product) => product.price <= price)
    // shipping 
    // here check for the value is comming from the state  its true
    // I will run it against all my products 
    if (shipping) {
      // if the shipping is true return the products that ahs the shipping property equal to true  
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }
    // console.log('filtering products')
    return (
      // when return filtered_products is equal to tempProducts 
      { ...state, filtered_products: tempProducts }
    )
  }

  if (action.type === CLEAR_FILTERS) {
    return (
      {
        ...state,
        filters: {
          // first get all the props
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          // setup the default value of max_price 
          price: state.filters.max_price,
          shipping: false,
        }
      }
    )
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
