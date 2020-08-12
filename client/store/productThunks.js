import axios from 'axios';
import { types } from './actions';
import { loaded, loading } from './actionCreators'

const getProducts = (products) => ({
  type: types.GET_PRODUCTS,
  products,
});

export const updateProductThunk = (id, name, price, description, history) => (dispatch) => {
  const updatedProduct = { id, name, price, description }
  return axios.put(`/api/products/${id}`, updatedProduct)
    .then(res => {
      dispatch({
        type: types.UPDATE_PRODUCT,
        payload: res.data
      })
      history.push('/Products')
    })
    .catch((e) => {
      console.log('failed to update Product')
      console.log(e)
    })
}

export const addProductThunk = (obj) => async (dispatch) => {
  const newProduct = {
    price: Number(obj.price),
    name: obj.name,
    description: obj.description,
    categoryId: obj.categoryId,
  }
  return axios
    .post('/api/products', newProduct)
    .then((res) => {
      dispatch({
        type: types.ADD_PRODUCT,
        payload: res.data.product,
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

export const deleteProductThunk = (id, history) => async (dispatch) => {
  const deletedProduct = { id }
  return axios.delete(`/api/products/${id}`, deletedProduct)
    .then(res => {
      dispatch({
        type: types.DELETE_PRODUCT,
        payload: res.data
      })
      history.push('/products')
    })
    .catch((e) => {
      console.log('failed to delete Product')
      console.log(e)
    })
};

export const getProductsThunk = () => (dispatch) => {
  dispatch(loading());
  return axios
    .get('/api/products')
    .then(({ data }) => {
      console.log(data)
      dispatch(getProducts(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
      return 'Error fetching products';
    });
};

export const sortProductsThunk = (type) => (dispatch) => {
  return axios.get(`api/products/sort/${type}`)
    .then(({ data }) => {
      dispatch(getProducts(data));
    })
    .catch((e) => {
      console.log('failed to fetch Products');
      console.log(e);
    })
}
