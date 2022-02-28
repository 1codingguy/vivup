import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants'

export const addToCart = (item, qty) => (dispatch) => {
  
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      image: item.image,
      name: item.name,
      price: item.price,
      qty,
    },
  })
}

export const removeItem = (id) => (dispatch) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
}