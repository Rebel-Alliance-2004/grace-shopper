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
    imgSrcLg: obj.imgSrcLg,
    imgSrcSm: obj.imgSrcSm
  }
  console.log(newProduct)
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

export const sortProductsThunk = (type, products) => (dispatch) => {
  switch (type) {
    case 'Price High to Low': products = products.sort((a, b) => Number(a.price) > Number(b.price) ? -1 : 1);
      break;
    case 'Price Low to High': products = products.sort((a, b) => Number(a.price) < Number(b.price) ? -1 : 1);
      break;
    case 'Name A to Z': products = products.sort((a, b) => a.name < b.name ? -1 : 1);
      break;
    case 'Name Z to A': products = products.sort((a, b) => a.name > b.name ? -1 : 1);
      break;
    default: break;
  }
  dispatch(getProducts(products));
}

export const searchProductsThunk = (searchTerm) => (dispatch) => {
  dispatch(loading());
  return axios.get(`/search?term=${searchTerm}`)
    .then(({ data }) => {
      dispatch(getProducts(data));
      dispatch(loaded());
    })
    .catch(e => {
      dispatch(loaded());
      throw e;
    })
}
