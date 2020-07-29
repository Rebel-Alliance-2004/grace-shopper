import axios from 'axios';
import {
  LOGIN,
  LOGOUT,
  LOGIN_FAIL,
  LOADED,
  LOADING,
  GET_PRODUCTS,
  ADD_TO_CART,
  types,
  GET_CART,
  GET_CATEGORIES,
} from './actions';

const login = (username) => ({
  type: LOGIN,
  username,
});
const logout = () => ({
  type: LOGOUT,
});

const loginFail = (message) => ({
  type: LOGIN_FAIL,
  message,
});

export const loading = () => ({
  type: LOADING,
});

export const loaded = () => ({
  type: LOADED,
});

const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

const addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

export const loginThunk = (username, password) => (dispatch) => {
  dispatch(loading());
  return axios
    .post('/user/login', { username, password })
    .then((res) => {
      console.log(res.data);
      dispatch(login(username));
      dispatch(loaded());
    })
    .catch((res) => {
      dispatch(loginFail('Incorrect username or password'));
      dispatch(loaded());
    });
};
export const whoami = () => (dispatch) => {
  dispatch(loading());
  return axios.get('/user/whoami').then(({ data }) => {
    if (data.loggedIn) {
      dispatch(login(data.username));
    } else {
      dispatch(logout());
    }
    dispatch(loaded());
  });
};

export const logoutThunk = () => (dispatch) => {
  dispatch(loading());
  return axios
    .get('/user/logout')
    .then(() => {
      dispatch(logout());
      dispatch(loaded());
    })
    .catch((e) => {
      dispatch(loaded());
      console.log(e);
    });
};

export const getProductsThunk = () => (dispatch) => {
  dispatch(loading());
  return axios
    .get('/api/products')
    .then(({ data }) => {
      dispatch(getProducts(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
      return 'Error fetching products';
    });
};

export const addProductThunk = (obj) => (dispatch) => {
  const newProd = {
    price: obj.price,
    name: obj.name,
    description: obj.description,
    categoryId: obj.categoryId,
  };
  axios.post('/api/products', newProd)
    .then(() => {
      dispatch({
        type: types.ADD_PRODUCT,
        payload: newProd,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteProductThunk = (id) => async (dispatch) => {
  const deletedProd = { id };
  await axios.delete(`/api/products/${id}`, deletedProd)
    .then((res) => {
      dispatch({
        type: types.SET_PRODUCT,
        payload: res.data.products,
      });
    })
    .catch((e) => {
      console.log('failed to delete Product');
      console.log(e);
    });
};

export const updateProductThunk = (product, history) => (dispatch) => axios.put(`/api/products/${product.id}`, product)
  .then((res) => {
    dispatch({
      type: types.SET_PRODUCT,
      payload: res.data,
    });
    history.push('/products');
  })
  .catch((e) => {
    console.log('failed to update Product');
    console.log(e);
  });

export const getCategoriesThunk = () => (dispatch) => {
  dispatch(loading());
  return axios
    .get('/api/categories')
    .then(({ data }) => {
      dispatch(getCategories(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
      return 'Error fetching categories';
    });
};

export const addCategoryThunk = (obj) => (dispatch) => {
  const newCat = { name: obj.name };
  axios.post('/api/category', newCat)
    .then(() => {
      dispatch({
        type: types.ADD_CATEGORY,
        payload: newCat,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteCategoryThunk = (id) => async (dispatch) => {
  const deletedCat = { id };
  await axios.delete(`/api/categories/${id}`, deletedCat)
    .then((res) => {
      dispatch({
        type: types.DELETE_CATEGORY,
        payload: res.data,
      });
    })
    .catch((e) => {
      console.log('failed to delete Category');
      console.log(e);
    });
};

export const updateCategory = (id, name, history) => (dispatch) => {
  const updatedCat = { id, name };
  return axios.put(`/api/categories/${id}`, updatedCat)
    .then((res) => {
      dispatch({
        type: types.SET_CATEGORY,
        payload: res.data,
      });
      history.push('/categories');
    })
    .catch((e) => {
      console.log('failed to update Category');
      console.log(e);
    });
};

export const addToCartThunk = (productId, quantity) => (dispatch) => {
  dispatch(loading());
  return axios
    .post(`/cart/add/${productId}?quantity=${quantity}`)
    .then(({ data }) => {
      dispatch(addToCart(data));
      dispatch(loaded());
    });
};

export const getCartThunk = () => (dispatch) => {
  dispatch(loading());
  return axios.get('/cart/get').then(({ data }) => {
    dispatch(getCart(data));
    dispatch(loaded());
  });
};
