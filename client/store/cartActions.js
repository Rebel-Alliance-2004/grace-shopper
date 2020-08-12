import axios from 'axios';
import { loading, loaded } from './actionCreators'
import { cartTypes } from './actions'

const addToCart = (cart) => ({
  type: cartTypes.ADD_TO_CART,
  cart,
});

const getCart = (cart) => ({
  type: cartTypes.GET_CART,
  cart,
});

const getCarts = (carts) => ({
  type: cartTypes.GET_CARTS,
  carts,
});

const updateCart = (cart) => {
  return {
    type: cartTypes.UPDATE_CART,
    cart
  }
}

export const addToCartThunk = (productId, quantity) => (dispatch) => {
  dispatch(loading());
  return axios
    .post(`/cart/add/${productId}?quantity=${quantity}`)
    .then(({ data }) => {
      console.log(data)
      dispatch(addToCart(data));
      dispatch(loaded());
    })
    .catch((e) => {
      dispatch(loaded());
      console.error(e);
      return 'Error adding to cart'
    })
};

export const getCartThunk = () => (dispatch) => {
  dispatch(loading());
  return axios.get('/cart/get')
    .then(({ data }) => {
      dispatch(getCart(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
    })
};

export const getUserCartsThunk = () => (dispatch) => {
  return axios.get('/cart/get/carts')
    .then(({ data }) => {
      dispatch(getCarts(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
    })
};

export const removeFromCartThunk = (id) => (dispatch) => {
  dispatch(loading());
  return axios.delete(`/cart/remove/${id}`)
    .then(({ data }) => {
      dispatch(getCart(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
    })
}

export const updateCartThunk = (id, quantity) => (dispatch) => {
  dispatch(loading());
  return axios.put(`/cart/update/${id}?quantity=${quantity}`)
    .then(({ data }) => {
      console.log(data)
      dispatch(updateCart(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
      return 'Error updataing quantity'
    })
}

export const updateCartStatusThunk = (id) => (dispatch) => {
  dispatch(loading());
  return axios.put(`/cart/updateCart/${id}`)
    .then(({ data }) => {
      console.log(data)
      dispatch(updateCart(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
      return 'Error updataing status'
    })
}