import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    // values are passing from add to cart
    const { id, color, amount, product } = action.payload;
    // check if item its in the cart, when setting up the id combine with color
    // if item its not in the cart  
    const tempItem = state.cart.find((i) => i.id === id + color)
    // if item exist its in the cart
    if (tempItem) {
      // we are mapping over the cart checking the ids 
      const tempCart = state.cart.map((cartItem) => {
        // check for id and color id plus color
        // if item its in the cart iterate over the cart and check where is the item 
        if (cartItem.id === id + color) {
          // we increase the amount 
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return ({ ...cartItem, amount: newAmount })
        }
        // and if the cart id does not match just return cartItem 
        else {
          return cartItem
        }
      })
      return ({ ...state, cart: tempCart })
    }
    // if not in the cart create anew one  with props
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
