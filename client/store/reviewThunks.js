import axios from 'axios'
import { reviewTypes } from './actions'
import { loaded, loading } from './actionCreators'

const createReview = ({ productId, starRating, reviewTitle, reviewText }) => {

  return {
    type: reviewTypes.CREATE_REVIEW,
    payload: {
      id: null,
      userId: null,
      productId,
      starRating,
      reviewTitle,
      reviewText,
    }
  }
}

const createReviewThunk = (productId, starRating, reviewTitle, reviewText) => {
  return (dispatch) => {
    dispatch(loading())
    return axios.post('/reviews', { productId, starRating, reviewTitle, reviewText })
      .then(({ data }) => {
        dispatch(createReview(data))
        dispatch(loaded())
      })
      .catch((e) => {
        console.log('failed to load reviews')
        console.log(e)
      })
  }
}

export default createReviewThunk
