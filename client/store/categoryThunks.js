import axios from 'axios';
import { types } from './actions';

export const updateCategoryThunk = (id, name, history) => (dispatch) => {
  const updatedCategory = { id, name }
  return axios.put(`/api/categories/${id}`, updatedCategory)
    .then(res => {
      dispatch({
        type: types.UPDATE_CATEGORY,
        payload: res.data
      })
      history.push('/categories')
    })
    .catch((e) => {
      console.log('failed to update Category')
      console.log(e)
    })
}

export const deleteCategoryThunk = (id, history) => async (dispatch) => {
  const deletedCategory = { id }
  return axios.delete(`/api/categories/${id}`, deletedCategory)
    .then(res => {
      dispatch({
        type: types.DELETE_CATEGORY,
        payload: res.data
      })
      history.push('/categories')
    })
    .catch((e) => {
      console.log('failed to delete Category')
      console.log(e)
    })
};
