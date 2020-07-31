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
        type: types.ADD_PRODUCT,
        payload: res.data
      })
      history.push('/admin/Products')
    })
    .catch((e) => {
      console.log('failed to update Product')
      console.log(e)
    })
}

export const addProductThunk = (obj) => async (dispatch) => axios
  .post('/api/products', {
    price: obj.price,
    name: obj.name,
    description: obj.description,
    categoryId: obj.categoryId,
  })
  .then((res) => {
    dispatch({
      type: types.ADD_PRODUCT,
      payload: res.data.products,
    });
  })
  .catch((e) => {
    console.log(e);
  });

export const deleteProductThunk = (id, history) => async (dispatch) => {
  const deletedProduct = { id }
  return axios.delete(`/api/products/${id}`, deletedProduct)
    .then(res => {
      dispatch({
        type: types.ADD_PRODUCT,
        payload: res.data
      })
      history.push('/admin/products')
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
      dispatch(getProducts(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
      return 'Error fetching products';
    });
};
